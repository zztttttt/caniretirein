import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { storage, StorageKeys } from '../utils/storage';
import { formatCurrency } from '../utils/currency';
import { useTheme } from '../utils/theme';

export default function StockPortfolioScreen() {
  const { theme, isDark } = useTheme();
  const [stocks, setStocks] = useState([]);
  const [showAddStock, setShowAddStock] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [newStock, setNewStock] = useState({
    ticker: '',
    quantity: '',
    purchasePrice: '',
    type: 'stock', // 'stock' or 'crypto'
  });
  const [tempType, setTempType] = useState('stock');
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [showChartDetails, setShowChartDetails] = useState(false);
  const [selectedChartData, setSelectedChartData] = useState(null);
  const [timeFrame, setTimeFrame] = useState('7d'); // '1d', '7d', '30d', 'ytd', 'all', 'custom'
  const [showTimeFramePicker, setShowTimeFramePicker] = useState(false);
  const [tempTimeFrame, setTempTimeFrame] = useState('7d');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [chartFilter, setChartFilter] = useState('both'); // 'stocks', 'crypto', 'both'
  const [showChartFilterPicker, setShowChartFilterPicker] = useState(false);
  const [tempChartFilter, setTempChartFilter] = useState('both');
  const chartScrollViewRef = useRef(null);
  const lastCaptureDateRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedStocks = await storage.getItem(StorageKeys.STOCKS);
    const savedApiKey = await storage.getItem(StorageKeys.FINNHUB_API_KEY);
    const savedHistory = await storage.getItem(StorageKeys.PORTFOLIO_HISTORY);
    if (savedStocks) setStocks(savedStocks);
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedHistory) setPortfolioHistory(savedHistory);
  };

  const addStock = () => {
    if (!newStock.ticker || !newStock.quantity || !newStock.purchasePrice) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const stock = {
      id: Date.now(),
      ticker: newStock.ticker.toUpperCase(),
      quantity: parseFloat(newStock.quantity),
      purchasePrice: parseFloat(newStock.purchasePrice),
      type: newStock.type,
      currentPrice: parseFloat(newStock.purchasePrice), // Initial price
      lastUpdated: new Date().toISOString(),
    };

    const newStocks = [...stocks, stock];
    setStocks(newStocks);
    storage.setItem(StorageKeys.STOCKS, newStocks);
    setShowAddStock(false);
    setNewStock({ ticker: '', quantity: '', purchasePrice: '', type: 'stock' });
  };

  const deleteStock = (id) => {
    Alert.alert('Delete Stock', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const newStocks = stocks.filter((s) => s.id !== id);
          setStocks(newStocks);
          storage.setItem(StorageKeys.STOCKS, newStocks);
        },
      },
    ]);
  };

  const fetchStockPrice = async (ticker) => {
    // Require API key for stock prices - demo key has strict rate limits
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }
    const token = apiKey;
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${token}`;
    
    try {
      // Create timeout promise that resolves (not rejects) to avoid unhandled rejections
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(null), 10000);
      });
      
      // Wrap fetch in a promise that handles errors
      const fetchPromise = fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }).catch((err) => {
        // Return null on network errors
        return null;
      });
      
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response) {
        // Timeout or network error
        return null;
      }
      
      if (!response.ok) {
        // HTTP error (e.g., 429 rate limit, 401 unauthorized)
        if (response.status === 429) {
          // Rate limit - could show a message but we'll return null for now
          return null;
        }
        if (response.status === 401 || response.status === 403) {
          // Invalid API key
          return null;
        }
        return null;
      }
      
      const data = await response.json().catch(() => null);
      if (data && data.c && typeof data.c === 'number' && data.c > 0) {
        return data.c; // Current price
      }
      
      // Check for error in response
      if (data && data.error) {
        return null;
      }
    } catch (error) {
      // Silently handle any remaining errors
    }
    return null;
  };

  const fetchCryptoPrice = async (ticker) => {
    // Map common crypto tickers to CoinGecko IDs
    const cryptoMap = {
      BTC: 'bitcoin',
      ETH: 'ethereum',
      BNB: 'binancecoin',
      SOL: 'solana',
      ADA: 'cardano',
      XRP: 'ripple',
      DOT: 'polkadot',
      DOGE: 'dogecoin',
      MATIC: 'matic-network',
      AVAX: 'avalanche-2',
      LTC: 'litecoin',
      UNI: 'uniswap',
      ATOM: 'cosmos',
      LINK: 'chainlink',
      XLM: 'stellar',
      ALGO: 'algorand',
      VET: 'vechain',
      FIL: 'filecoin',
      TRX: 'tron',
      ETC: 'ethereum-classic',
    };
    
    const coinGeckoId = cryptoMap[ticker.toUpperCase()] || ticker.toLowerCase();
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`;
    
    try {
      // Create timeout promise that resolves (not rejects) to avoid unhandled rejections
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(null), 10000);
      });
      
      // Wrap fetch in a promise that handles errors
      const fetchPromise = fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      }).catch(() => null);
      
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response || !response.ok) {
        return null;
      }
      
      const data = await response.json().catch(() => null);
      if (data && data[coinGeckoId] && typeof data[coinGeckoId].usd === 'number') {
        return data[coinGeckoId].usd;
      }
    } catch (error) {
      // Silently handle any remaining errors
    }
    return null;
  };

  const refreshPrices = async (showAlert = false) => {
    setIsRefreshing(true);
    const currentStocks = [...stocks];
    const updatedStocks = [...currentStocks];
    let hasUpdates = false;
    let failedCount = 0;
    let errorMessage = '';

    try {
      // Check if API key is needed for stocks
      const hasStocks = currentStocks.some(s => s.type === 'stock');
      if (hasStocks && !apiKey) {
        errorMessage = 'Finnhub API key is required for stock prices. The demo key has rate limits.';
      }

      for (let i = 0; i < updatedStocks.length; i++) {
        const stock = updatedStocks[i];
        let price = null;

        try {
          if (stock.type === 'stock') {
            price = await fetchStockPrice(stock.ticker);
          } else if (stock.type === 'crypto') {
            price = await fetchCryptoPrice(stock.ticker);
          }

          if (price && price > 0) {
            updatedStocks[i].currentPrice = price;
            updatedStocks[i].lastUpdated = new Date().toISOString();
            hasUpdates = true;
          } else {
            failedCount++;
          }
        } catch (error) {
          failedCount++;
          // Continue with next stock if one fails
        }
      }

      if (hasUpdates) {
        setStocks(updatedStocks);
        storage.setItem(StorageKeys.STOCKS, updatedStocks);
      }
    } catch (error) {
      // Silently handle errors - network failures are expected
    } finally {
      setIsRefreshing(false);
      if (showAlert) {
        if (hasUpdates) {
          const message = failedCount > 0 
            ? `Prices refreshed! ${failedCount} ${failedCount === 1 ? 'price' : 'prices'} failed to update.`
            : 'Prices refreshed successfully!';
          Alert.alert('Success', message);
        } else {
          const message = errorMessage || 
            (failedCount === currentStocks.length 
              ? 'Unable to refresh prices. Please check your internet connection and API key (if using stocks).'
              : 'Unable to refresh prices. Please check your internet connection and try again.');
          Alert.alert('Warning', message);
        }
      }
    }
  };

  // Auto-refresh prices periodically (for price updates, but not for chart)
  useEffect(() => {
    if (stocks.length === 0) return;

    let isMounted = true;

    // Refresh immediately when stocks are loaded
    const initialRefresh = async () => {
      if (isMounted) {
        await refreshPrices(false);
      }
    };
    initialRefresh();

    const interval = setInterval(() => {
      if (isMounted) {
        refreshPrices(false);
      }
    }, 60000); // 60 seconds (1 minute) - just for price updates

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [stocks.length]);

  const saveApiKey = async () => {
    await storage.setItem(StorageKeys.FINNHUB_API_KEY, apiKey);
    Alert.alert('Success', 'API key saved!');
  };

  const testApiKey = async () => {
    if (!apiKey) {
      Alert.alert('Error', 'Please enter an API key first.');
      return;
    }
    
    setIsRefreshing(true);
    try {
      // Test with a common stock (AAPL)
      const testPrice = await fetchStockPrice('AAPL');
      if (testPrice && testPrice > 0) {
        Alert.alert('Success', `API key is working! Test price for AAPL: $${testPrice.toFixed(2)}`);
      } else {
        Alert.alert('Error', 'API key test failed. Please check:\n1. Your internet connection\n2. The API key is correct\n3. You haven\'t exceeded rate limits');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to test API key. Please check your internet connection.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const totalPortfolioValue = stocks.reduce(
    (sum, stock) => {
      if (chartFilter === 'both') {
        return sum + stock.quantity * stock.currentPrice;
      } else if (chartFilter === 'stocks' && stock.type === 'stock') {
        return sum + stock.quantity * stock.currentPrice;
      } else if (chartFilter === 'crypto' && stock.type === 'crypto') {
        return sum + stock.quantity * stock.currentPrice;
      }
      return sum;
    },
    0
  );

  const totalCostBasis = stocks.reduce(
    (sum, stock) => {
      if (chartFilter === 'both') {
        return sum + stock.quantity * stock.purchasePrice;
      } else if (chartFilter === 'stocks' && stock.type === 'stock') {
        return sum + stock.quantity * stock.purchasePrice;
      } else if (chartFilter === 'crypto' && stock.type === 'crypto') {
        return sum + stock.quantity * stock.purchasePrice;
      }
      return sum;
    },
    0
  );

  const totalGainLoss = totalPortfolioValue - totalCostBasis;

  // Capture a snapshot of current portfolio value (called automatically at midnight)
  const capturePortfolioSnapshot = async (silent = false) => {
    if (stocks.length === 0) {
      if (!silent) {
        Alert.alert('Error', 'No stocks or crypto to capture.');
      }
      return;
    }

    // Refresh prices first to ensure we capture the latest values
    await refreshPrices(false);

    // Calculate portfolio value - always use 'both' filter for daily snapshots
    const currentPortfolioValue = stocks.reduce(
      (sum, stock) => sum + stock.quantity * stock.currentPrice,
      0
    );
    
    const snapshot = {
      date: new Date().toISOString(),
      value: currentPortfolioValue,
    };
    
    setPortfolioHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, snapshot];
      // Keep only last 90 days of snapshots
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const filteredHistory = updatedHistory.filter(
        (entry) => new Date(entry.date) >= ninetyDaysAgo
      );
      storage.setItem(StorageKeys.PORTFOLIO_HISTORY, filteredHistory);
      
      // Update last capture date ref
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      lastCaptureDateRef.current = today.getTime();
      
      return filteredHistory;
    });

    if (!silent) {
      Alert.alert('Success', 'Portfolio snapshot captured!');
    }
  };

  // Clear all chart data
  const clearChartData = () => {
    Alert.alert(
      'Clear Chart Data',
      'Are you sure you want to clear all portfolio history? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setPortfolioHistory([]);
            storage.setItem(StorageKeys.PORTFOLIO_HISTORY, []);
            lastCaptureDateRef.current = null;
            Alert.alert('Success', 'Chart data cleared!');
          },
        },
      ]
    );
  };

  // Initialize last capture date ref from portfolio history
  useEffect(() => {
    if (portfolioHistory.length > 0) {
      const lastCapture = new Date(portfolioHistory[portfolioHistory.length - 1].date);
      lastCapture.setHours(0, 0, 0, 0);
      lastCaptureDateRef.current = lastCapture.getTime();
    }
  }, []); // Only run once on mount

  // Auto-capture at midnight (00:00 local time)
  useEffect(() => {
    if (stocks.length === 0) return;

    const checkAndCapture = async () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Check if it's midnight (00:00)
      if (hours === 0 && minutes === 0) {
        // Check if we already captured today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTime = today.getTime();
        
        // Only capture if we haven't captured today
        if (lastCaptureDateRef.current !== todayTime) {
          await capturePortfolioSnapshot(true);
        }
      }
    };

    // Check immediately on mount
    checkAndCapture();

    // Check every minute
    const interval = setInterval(checkAndCapture, 60000);

    return () => clearInterval(interval);
  }, [stocks.length]);

  // Filter portfolio history (snapshots) based on selected time frame
  const getFilteredHistory = () => {
    if (portfolioHistory.length === 0) return [];
    
    const now = new Date();
    let filtered = [...portfolioHistory];

    switch (timeFrame) {
      case '1d':
        // Last 24 hours
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        filtered = portfolioHistory.filter(
          (entry) => new Date(entry.date) >= oneDayAgo
        );
        break;
      case '7d':
        // Last 7 days
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = portfolioHistory.filter(
          (entry) => new Date(entry.date) >= sevenDaysAgo
        );
        break;
      case '30d':
        // Last 30 days
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = portfolioHistory.filter(
          (entry) => new Date(entry.date) >= thirtyDaysAgo
        );
        break;
      case 'ytd':
        // Year to date
        const yearStart = new Date(now.getFullYear(), 0, 1);
        filtered = portfolioHistory.filter(
          (entry) => new Date(entry.date) >= yearStart
        );
        break;
      case 'all':
        // All available snapshots
        filtered = portfolioHistory;
        break;
      case 'custom':
        // Custom date range
        if (customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999); // Include entire end date
          filtered = portfolioHistory.filter(
            (entry) => {
              const entryDate = new Date(entry.date);
              return entryDate >= start && entryDate <= end;
            }
          );
        }
        break;
      default:
        filtered = portfolioHistory;
    }

    return filtered;
  };

  const filteredHistory = getFilteredHistory();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.apiKeySection}>
          <TouchableOpacity style={[styles.refreshButton, { backgroundColor: theme.primary }]} onPress={() => refreshPrices(true)} disabled={isRefreshing}>
            <Text style={styles.refreshButtonText}>
              {isRefreshing ? 'Refreshing...' : 'Refresh Prices'}
            </Text>
          </TouchableOpacity>
          <View style={styles.apiKeyContainer}>
            <TextInput
              style={[styles.apiKeyInput, { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text }]}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="Finnhub API Key (required for stocks)"
              placeholderTextColor={theme.textTertiary}
              secureTextEntry={false}
            />
            <TouchableOpacity style={[styles.saveKeyButton, { backgroundColor: theme.success }]} onPress={saveApiKey}>
              <Text style={styles.saveKeyButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.apiKeyActions}>
            <TouchableOpacity style={[styles.testKeyButton, { backgroundColor: theme.success }]} onPress={testApiKey} disabled={isRefreshing || !apiKey}>
              <Text style={styles.testKeyButtonText}>Test API Key</Text>
            </TouchableOpacity>
            <Text style={[styles.apiKeyHelp, { color: theme.textSecondary }]}>
              <Text style={[styles.linkText, { color: theme.primary }]} onPress={() => {
                Linking.openURL('https://finnhub.io/register').catch(err => {
                  Alert.alert('Error', 'Could not open the registration page. Please visit https://finnhub.io/register manually.');
                });
              }}>
                Get free key
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.addStockSection}>
          <Text style={[styles.label, { color: theme.text }]}>
            {newStock.type === 'stock' ? 'Stock' : 'Crypto'} Ticker (e.g., {newStock.type === 'stock' ? 'AAPL, MSFT, GOOGL' : 'BTC, ETH, SOL'}):
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text }]}
            value={newStock.ticker}
            onChangeText={(value) => setNewStock({ ...newStock, ticker: value })}
            placeholder={newStock.type === 'stock' ? 'AAPL' : 'BTC'}
            placeholderTextColor={theme.textTertiary}
            autoCapitalize="characters"
          />

          <View style={styles.rowInputs}>
            <View style={styles.halfInput}>
              <Text style={[styles.label, { color: theme.text }]}>Quantity:</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text }]}
                value={newStock.quantity}
                onChangeText={(value) => setNewStock({ ...newStock, quantity: value })}
                placeholder="10"
                placeholderTextColor={theme.textTertiary}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={[styles.label, { color: theme.text }]}>Purchase Price ($):</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text }]}
                value={newStock.purchasePrice}
                onChangeText={(value) => setNewStock({ ...newStock, purchasePrice: value })}
                placeholder="150.00"
                placeholderTextColor={theme.textTertiary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={[styles.label, { color: theme.text }]}>Type:</Text>
          <TouchableOpacity
            style={[styles.pickerButton, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
            onPress={() => {
              setTempType(newStock.type);
              setShowTypePicker(true);
            }}
          >
            <Text style={[styles.pickerButtonText, { color: theme.text }]}>
              {newStock.type === 'stock' ? 'Stock' : 'Crypto'}
            </Text>
            <Text style={[styles.pickerArrow, { color: theme.textSecondary }]}>▼</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={addStock}>
            <Text style={styles.addButtonText}>Add {newStock.type === 'stock' ? 'Stock' : 'Crypto'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Portfolio</Text>
        {stocks.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No stocks or crypto added yet. Add stocks or crypto to track your portfolio value.
          </Text>
        ) : (
          stocks.map((stock) => {
            const currentValue = stock.quantity * stock.currentPrice;
            const costBasis = stock.quantity * stock.purchasePrice;
            const gainLoss = currentValue - costBasis;
            const gainLossPercent = ((gainLoss / costBasis) * 100).toFixed(2);

            return (
              <View key={stock.id} style={[styles.stockItem, { borderBottomColor: theme.border }]}>
                <View style={styles.stockHeader}>
                  <View>
                    <Text style={[styles.stockTicker, { color: theme.primary }]}>{stock.ticker}</Text>
                    <Text style={[styles.stockType, { color: theme.textSecondary }]}>
                      {stock.type === 'stock' ? 'Stock' : 'Crypto'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: theme.error }]}
                    onPress={() => deleteStock(stock.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.stockDetails}>
                  <View style={styles.stockDetailRow}>
                    <Text style={[styles.stockDetailLabel, { color: theme.textSecondary }]}>Quantity:</Text>
                    <Text style={[styles.stockDetailValue, { color: theme.text }]}>{stock.quantity}</Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text style={[styles.stockDetailLabel, { color: theme.textSecondary }]}>Purchase Price:</Text>
                    <Text style={[styles.stockDetailValue, { color: theme.text }]}>
                      {formatCurrency(stock.purchasePrice)}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text style={[styles.stockDetailLabel, { color: theme.textSecondary }]}>Current Price:</Text>
                    <Text style={[styles.stockDetailValue, { color: theme.text }]}>
                      {formatCurrency(stock.currentPrice)}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text style={[styles.stockDetailLabel, { color: theme.textSecondary }]}>Current Value:</Text>
                    <Text style={[styles.stockDetailValue, { color: theme.text }]}>
                      {formatCurrency(currentValue)}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text style={[styles.stockDetailLabel, { color: theme.textSecondary }]}>Gain/Loss:</Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        { color: gainLoss >= 0 ? theme.success : theme.error },
                      ]}
                    >
                      {gainLoss >= 0 ? '+' : ''}
                      {formatCurrency(gainLoss)} ({gainLossPercent}%)
                    </Text>
                  </View>
                  <Text style={[styles.lastUpdated, { color: theme.textTertiary }]}>
                    Last updated: {new Date(stock.lastUpdated).toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>

      <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryItem, { backgroundColor: theme.sectionHeader }]}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]} numberOfLines={2}>TOTAL PORTFOLIO VALUE</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{formatCurrency(totalPortfolioValue)}</Text>
          </View>
          <View style={[styles.summaryItem, { backgroundColor: theme.sectionHeader }]}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]} numberOfLines={2}>TOTAL COST BASIS</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{formatCurrency(totalCostBasis)}</Text>
          </View>
          <View style={[styles.summaryItem, { backgroundColor: theme.sectionHeader }]}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]} numberOfLines={2}>TOTAL GAIN/LOSS</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: totalGainLoss >= 0 ? theme.success : theme.error },
              ]}
            >
              {formatCurrency(totalGainLoss)}
            </Text>
          </View>
        </View>
      </View>

      {portfolioHistory.length >= 2 && (
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.chartHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Portfolio Value Over Time</Text>
            <View style={styles.chartHeaderButtons}>
              <TouchableOpacity
                style={[styles.clearButton, { backgroundColor: theme.error }]}
                onPress={clearChartData}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: theme.sectionHeader, borderColor: theme.border }]}
                onPress={() => {
                  setTempChartFilter(chartFilter);
                  setShowChartFilterPicker(true);
                }}
              >
                <Text style={[styles.filterButtonText, { color: theme.primary }]}>
                  {chartFilter === 'both' ? 'Both' :
                   chartFilter === 'stocks' ? 'Stocks' :
                   chartFilter === 'crypto' ? 'Crypto' : 'Both'}
                </Text>
                <Text style={[styles.pickerArrow, { color: theme.textSecondary }]}>▼</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timeFrameButton, { backgroundColor: theme.sectionHeader, borderColor: theme.border }]}
                onPress={() => {
                  setTempTimeFrame(timeFrame);
                  setShowTimeFramePicker(true);
                }}
              >
                <Text style={[styles.timeFrameButtonText, { color: theme.primary }]}>
                  {timeFrame === '1d' ? '24H' :
                   timeFrame === '7d' ? '7D' :
                   timeFrame === '30d' ? '30D' :
                   timeFrame === 'ytd' ? 'YTD' :
                   timeFrame === 'all' ? 'All' :
                   timeFrame === 'custom' ? 'Custom' : '7D'}
                </Text>
                <Text style={[styles.pickerArrow, { color: theme.textSecondary }]}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {timeFrame === 'custom' && (
            <View style={[styles.customDateRangeContainer, { backgroundColor: theme.sectionHeader }]}>
              <View style={styles.dateInputRow}>
                <View style={styles.halfInput}>
                  <Text style={[styles.label, { color: theme.text }]}>Start Date</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text }]}
                    value={customStartDate}
                    onChangeText={setCustomStartDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={theme.textTertiary}
                  />
                </View>
                <View style={styles.halfInput}>
                  <Text style={[styles.label, { color: theme.text }]}>End Date</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text }]}
                    value={customEndDate}
                    onChangeText={setCustomEndDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={theme.textTertiary}
                  />
                </View>
              </View>
            </View>
          )}

          {filteredHistory.length >= 2 ? (() => {
            // Use snapshot data directly - no recalculation needed
            const chartData = [...filteredHistory];
            
            // Format labels - show fewer labels for readability
            const labels = chartData.map((entry, index) => {
              const date = new Date(entry.date);
              // Show label for first, last, and every 5th-10th point depending on length
              const labelInterval = chartData.length <= 10 ? 1 : Math.ceil(chartData.length / 8);
              if (index === 0 || index === chartData.length - 1 || index % labelInterval === 0) {
                // Format based on time frame
                if (timeFrame === '1d') {
                  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                } else if (timeFrame === '7d' || timeFrame === '30d') {
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                } else {
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }
              }
              return '';
            });
            
            // Fixed chart width to screen width, but data extends beyond
            const screenWidth = Dimensions.get('window').width;
            const fixedChartWidth = screenWidth - 64; // Fixed width for visible chart
            const pointWidth = 50; // Width per data point
            const totalDataWidth = chartData.length * pointWidth; // Total width of all data
            
            return (
              <ScrollView
                ref={chartScrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.chartScrollContainer}
                style={styles.chartScrollView}
              >
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: chartData.map((entry) => entry.value),
                      },
                    ],
                  }}
                  width={Math.max(fixedChartWidth, totalDataWidth)}
                  height={220}
              yAxisLabel="$"
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: theme.cardBackground,
                backgroundGradientFrom: theme.cardBackground,
                backgroundGradientTo: theme.cardBackground,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(42, 101, 153, ${opacity})`,
                labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '0',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '', // solid lines
                  strokeWidth: 0.5,
                },
              }}
              bezier
              segments={4}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={(data) => {
                const index = data.index;
                const entry = chartData[index];
                if (entry) {
                  setSelectedChartData({
                    date: new Date(entry.date).toLocaleString(),
                    value: entry.value,
                  });
                  setShowChartDetails(true);
                }
              }}
            />
              </ScrollView>
            );
          })() : (
            <Text style={[styles.chartHelpText, { color: theme.textSecondary }]}>
              {timeFrame === 'custom' && (!customStartDate || !customEndDate)
                ? 'Please select start and end dates'
                : `No data available for the selected time frame. ${filteredHistory.length} data point(s) found.`}
            </Text>
          )}
        </View>
      )}
      {portfolioHistory.length < 2 && (
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Portfolio Value Over Time</Text>
          <Text style={[styles.chartHelpText, { color: theme.textSecondary }]}>
            Chart will appear after at least 2 daily snapshots are captured. Portfolio value is automatically captured at midnight (00:00) local time each day.
          </Text>
        </View>
      )}

      {/* Type Picker Modal */}
      <Modal
        visible={showTypePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTypePicker(false)}
      >
        <View style={styles.pickerModalOverlay}>
          <View style={[styles.pickerModalContent, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Select Type</Text>
              <TouchableOpacity
                onPress={() => {
                  setNewStock({ ...newStock, type: tempType });
                  setShowTypePicker(false);
                }}
              >
                <Text style={[styles.modalClose, { color: theme.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempType}
              onValueChange={(value) => {
                setTempType(value);
              }}
              style={[styles.modalPicker, { backgroundColor: theme.cardBackground }]}
              itemStyle={{ color: theme.text }}
            >
              <Picker.Item label="Stock" value="stock" />
              <Picker.Item label="Crypto" value="crypto" />
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Chart Details Modal */}
      <Modal
        visible={showChartDetails}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowChartDetails(false)}
      >
        <View style={styles.chartModalOverlay}>
          <View style={[styles.chartModalContent, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Portfolio Value</Text>
              <TouchableOpacity onPress={() => setShowChartDetails(false)}>
                <Text style={[styles.modalClose, { color: theme.primary }]}>Close</Text>
              </TouchableOpacity>
            </View>
            {selectedChartData && (
              <View style={styles.chartDetailsContent}>
                <Text style={[styles.chartDetailLabel, { color: theme.textSecondary }]}>Date:</Text>
                <Text style={[styles.chartDetailValue, { color: theme.primary }]}>{selectedChartData.date}</Text>
                <Text style={[styles.chartDetailLabel, { color: theme.textSecondary }]}>Portfolio Value:</Text>
                <Text style={[styles.chartDetailValue, { color: theme.primary }]}>
                  {formatCurrency(selectedChartData.value)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Time Frame Picker Modal */}
      <Modal
        visible={showTimeFramePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimeFramePicker(false)}
      >
        <View style={styles.pickerModalOverlay}>
          <View style={[styles.pickerModalContent, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Select Time Frame</Text>
              <TouchableOpacity
                onPress={() => {
                  setTimeFrame(tempTimeFrame);
                  setShowTimeFramePicker(false);
                }}
              >
                <Text style={[styles.modalClose, { color: theme.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempTimeFrame}
              onValueChange={(value) => {
                setTempTimeFrame(value);
              }}
              style={[styles.modalPicker, { backgroundColor: theme.cardBackground }]}
              itemStyle={{ color: theme.text }}
            >
              <Picker.Item label="24 Hours" value="1d" />
              <Picker.Item label="7 Days" value="7d" />
              <Picker.Item label="30 Days" value="30d" />
              <Picker.Item label="Year to Date" value="ytd" />
              <Picker.Item label="All Time" value="all" />
              <Picker.Item label="Custom Range" value="custom" />
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Chart Filter Picker Modal */}
      <Modal
        visible={showChartFilterPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChartFilterPicker(false)}
      >
        <View style={styles.pickerModalOverlay}>
          <View style={[styles.pickerModalContent, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Filter by Type</Text>
              <TouchableOpacity
                onPress={() => {
                  setChartFilter(tempChartFilter);
                  setShowChartFilterPicker(false);
                }}
              >
                <Text style={[styles.modalClose, { color: theme.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempChartFilter}
              onValueChange={(value) => {
                setTempChartFilter(value);
              }}
              style={[styles.modalPicker, { backgroundColor: theme.cardBackground }]}
              itemStyle={{ color: theme.text }}
            >
              <Picker.Item label="Both" value="both" />
              <Picker.Item label="Stocks Only" value="stocks" />
              <Picker.Item label="Crypto Only" value="crypto" />
            </Picker>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  header: {
    backgroundColor: '#2a6599',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2a6599',
    marginBottom: 12,
  },
  apiKeySection: {
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#2a6599',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  apiKeyContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  apiKeyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  saveKeyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveKeyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  apiKeyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  testKeyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  testKeyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  apiKeyHelp: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  linkText: {
    color: '#2a6599',
    textDecorationLine: 'underline',
  },
  addStockSection: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 4,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 4,
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#333',
  },
  pickerArrow: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#2a6599',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stockItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockTicker: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2a6599',
  },
  stockType: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  stockDetails: {
    gap: 8,
  },
  stockDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  stockDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  lastUpdated: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    height: 32,
    lineHeight: 14,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 0,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    padding: 20,
  },
  pickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2a6599',
  },
  modalClose: {
    fontSize: 16,
    color: '#2a6599',
    fontWeight: '600',
  },
  modalPicker: {
    height: 200,
  },
  chartHelpText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  chartModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  chartDetailsContent: {
    marginTop: 16,
  },
  chartDetailLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  chartDetailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2a6599',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  chartHeaderButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  timeFrameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeFrameButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a6599',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f44336',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a6599',
  },
  customDateRangeContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  dateInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  chartScrollView: {
    marginVertical: 8,
    width: '100%',
  },
  chartScrollContainer: {
    paddingRight: 16,
  },
});

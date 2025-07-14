import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Eye, Heart, Calendar, Filter, Download, BarChart3, PieChart, Activity } from 'lucide-react';
import { AdminAnalytics, User, ActivityLog } from '../types';

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from your backend
  useEffect(() => {
    setTimeout(() => {
      setAnalytics({
        totalUsers: 12847,
        activeUsers: 8934,
        newUsersToday: 234,
        popularStyles: [
          { style: 'Casual Chic', count: 3421 },
          { style: 'Classic Elegance', count: 2876 },
          { style: 'Bohemian', count: 2134 },
          { style: 'Minimalist', count: 1987 },
          { style: 'Edgy Modern', count: 1654 }
        ],
        averageBMI: 23.4,
        topOutfits: [],
        userEngagement: {
          dailyLogins: 5678,
          outfitViews: 23456,
          quizCompletions: 1234
        }
      });

      // Mock user data
      setUsers([
        {
          id: '1',
          email: 'sarah.johnson@email.com',
          name: 'Sarah Johnson',
          gender: 'female',
          preferences: {
            favoriteColors: ['navy', 'white', 'blush'],
            stylePreferences: ['classic', 'casual-chic'],
            occasions: ['work', 'casual'],
            brands: ['Zara', 'H&M']
          },
          activityLog: [
            {
              id: '1',
              type: 'login',
              timestamp: new Date(),
              details: { device: 'iPhone 13' }
            }
          ]
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [selectedTimeRange, selectedFilter]);

  const exportData = (type: string) => {
    // Mock export functionality
    const data = type === 'users' ? users : analytics;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stylewise-${type}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor user activity, trends, and platform performance</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="1d">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Users</option>
                  <option value="new">New Users</option>
                  <option value="premium">Premium Users</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => exportData('users')}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Users</span>
              </button>
              <button
                onClick={() => exportData('analytics')}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{analytics?.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{analytics?.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">↑ 8% from last week</p>
              </div>
              <Activity className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Users Today</p>
                <p className="text-3xl font-bold text-gray-900">{analytics?.newUsersToday}</p>
                <p className="text-sm text-blue-600 mt-1">↑ 15% from yesterday</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average BMI</p>
                <p className="text-3xl font-bold text-gray-900">{analytics?.averageBMI}</p>
                <p className="text-sm text-gray-500 mt-1">Healthy range</p>
              </div>
              <BarChart3 className="h-12 w-12 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Styles */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <PieChart className="h-6 w-6 mr-2 text-rose-500" />
              Popular Style Preferences
            </h2>
            <div className="space-y-4">
              {analytics?.popularStyles.map((style, index) => (
                <div key={style.style} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                    <span className="text-gray-700">{style.style}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-200 rounded-full h-2 w-24">
                      <div 
                        className="bg-rose-500 h-2 rounded-full"
                        style={{ width: `${(style.count / 3500) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{style.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Engagement */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-blue-500" />
              User Engagement
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Daily Logins</span>
                <span className="text-2xl font-bold text-blue-600">{analytics?.userEngagement.dailyLogins.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Outfit Views</span>
                <span className="text-2xl font-bold text-green-600">{analytics?.userEngagement.outfitViews.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Quiz Completions</span>
                <span className="text-2xl font-bold text-purple-600">{analytics?.userEngagement.quizCompletions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent User Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Style Preferences</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{user.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.preferences.stylePreferences.slice(0, 2).map((style, index) => (
                          <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {style}
                          </span>
                        ))}
                        {user.preferences.stylePreferences.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            +{user.preferences.stylePreferences.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.activityLog?.[0] ? new Date(user.activityLog[0].timestamp).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
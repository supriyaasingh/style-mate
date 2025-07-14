import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Camera, Users, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SocialPost, User } from '../types';

const SocialFeed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ caption: '', image: '', tags: [] });

  // Mock data
  useEffect(() => {
    setPosts([
      {
        id: '1',
        userId: '2',
        outfitId: '1',
        caption: 'Loving this classic business look! Perfect for my presentation today 💼✨ #WorkStyle #ClassicElegance',
        image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
        likes: ['3', '4', '5'],
        comments: [
          {
            id: '1',
            userId: '3',
            content: 'You look amazing! Where did you get that blazer?',
            createdAt: new Date(),
            likes: ['2']
          }
        ],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        tags: ['WorkStyle', 'ClassicElegance']
      },
      {
        id: '2',
        userId: '3',
        outfitId: '2',
        caption: 'Weekend vibes with this cozy casual look 🌸 Thanks @stylewise for the perfect recommendation!',
        image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
        likes: ['1', '2', '4', '5', '6'],
        comments: [],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        tags: ['WeekendStyle', 'CasualChic']
      }
    ]);

    setFollowing([
      {
        id: '2',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        gender: 'female',
        preferences: { favoriteColors: [], stylePreferences: ['classic'], occasions: [], brands: [] }
      },
      {
        id: '3',
        name: 'Sophie Chen',
        email: 'sophie@example.com',
        gender: 'female',
        preferences: { favoriteColors: [], stylePreferences: ['casual-chic'], occasions: [], brands: [] }
      }
    ]);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user?.id || '');
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== user?.id)
            : [...post.likes, user?.id || '']
        };
      }
      return post;
    }));
  };

  const handleShare = (postId: string) => {
    // Mock share functionality
    navigator.share?.({
      title: 'Check out this StyleWise outfit!',
      url: `https://stylewise.app/post/${postId}`
    });
  };

  const getUserById = (userId: string) => {
    return following.find(u => u.id === userId) || {
      id: userId,
      name: 'Unknown User',
      email: '',
      gender: 'female' as const,
      preferences: { favoriteColors: [], stylePreferences: [], occasions: [], brands: [] }
    };
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Style Community
          </h1>
          <p className="text-xl text-gray-600">
            Share your looks, get inspired, and connect with fellow fashion enthusiasts
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12.5K</p>
            <p className="text-sm text-gray-600">Community Members</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">45.2K</p>
            <p className="text-sm text-gray-600">Outfits Shared</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">892</p>
            <p className="text-sm text-gray-600">Style Awards</p>
          </div>
        </div>

        {/* Create Post Button */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl hover:from-rose-100 hover:to-purple-100 transition-all"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            <span className="text-gray-600">Share your latest outfit...</span>
            <Camera className="h-5 w-5 text-gray-400 ml-auto" />
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-8">
          {posts.map((post) => {
            const postUser = getUserById(post.userId);
            const isLiked = post.likes.includes(user?.id || '');
            
            return (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {postUser.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{postUser.name}</h3>
                        <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Post Image */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt="Outfit post"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      Outfit #{post.outfitId}
                    </span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors`}
                      >
                        <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes.length}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-6 w-6" />
                        <span>{post.comments.length}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                      >
                        <Share2 className="h-6 w-6" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Post Caption */}
                  <div className="mb-4">
                    <p className="text-gray-900 leading-relaxed">{post.caption}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3">
                      {post.comments.map((comment) => {
                        const commentUser = getUserById(comment.userId);
                        return (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {commentUser.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-semibold text-sm text-gray-900">{commentUser.name}</p>
                                <p className="text-gray-700 text-sm">{comment.content}</p>
                              </div>
                              <div className="flex items-center space-x-4 mt-1">
                                <button className="text-xs text-gray-500 hover:text-gray-700">
                                  {formatTimeAgo(comment.createdAt)}
                                </button>
                                <button className="text-xs text-gray-500 hover:text-red-500">
                                  Like ({comment.likes.length})
                                </button>
                                <button className="text-xs text-gray-500 hover:text-blue-500">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user?.name.charAt(0)}
                      </div>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;
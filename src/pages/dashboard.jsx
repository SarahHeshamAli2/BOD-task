import React, { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Grid3X3,
  List,
  Zap,
  Award,
  Clock,
} from "lucide-react";
import axiosInstance from "../services/api";
import { PRODUCTS } from "../services/end-points";
import { useAuth } from "../featuers/auth/useAuth";
import Skeleton from "../components/ui/skeleton";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getTopItems = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(PRODUCTS.GET_TOP_PRODUCTS);
      console.log(response.data.data);
      setItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTopItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.en
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = [
    {
      title: "Total Products",
      value: items.length,
      icon: ShoppingBag,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      title: "Revenue",
      value: "$24,580",
      icon: DollarSign,
      color: "bg-green-500",
      trend: "+8%",
    },
    {
      title: "Customers",
      value: "1,247",
      icon: Users,
      color: "bg-purple-500",
      trend: "+23%",
    },
    {
      title: "Growth",
      value: "89%",
      icon: TrendingUp,
      color: "bg-orange-500",
      trend: "+5%",
    },
  ];

  if (loading) {
    return (
      <Skeleton
        variant="dashboard"
        statsCount={4}
        itemsCount={8}
        viewMode={viewMode} 
        user={user}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {user && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back {user?.name?.split(" ").slice(0, 1)} !
            </h2>
            <p className="text-gray-600">
              Here's what's happening with your store today.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-600">Bulk Import</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">
                Manage Promotions
              </span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-600">
                View Analytics
              </span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Selled Items
              </h3>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {filteredItems.length} items
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600"
                  }`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600"
                  }`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className={`bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 hover:scale-105 group ${
                  viewMode === "list" ? "flex items-center p-4" : "p-6"
                }`}>
                {viewMode === "grid" ? (
                  <div>
                    {/* Item Image/Icon */}
                    <div className="text-center mb-4">
                      <img src={item.image} alt={item.name.en} />
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name.en}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      <span className="text-sm font-medium">
                        {item.orderCount} items Orderd
                      </span>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-center mb-4">
                      {item.orderCount ? (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {item.totalQuantity} in stock
                        </span>
                      ) : (
                        <span className="text-red-600 text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          Out of stock
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 w-full">
                    <img
                      className="w-1/3"
                      src={item.image}
                      alt={item.name.en}
                    />

                    <div className="flex-1">
                      <p className="text-gray-500 text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <span
                          className={`text-sm ${
                            item.orderCount ? "text-green-600" : "text-red-600"
                          }`}>
                          {item.orderCount
                            ? `${item.totalQuantity} in stock`
                            : "Out of stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

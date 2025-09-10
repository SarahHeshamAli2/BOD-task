
const SkeletonBox = ({ className = "", width, height }) => (
  <div 
    className={`bg-gray-200 rounded animate-pulse ${className}`}
    style={{ width, height }}
  />
);

const SkeletonText = ({ className = "", width = "100%" }) => (
  <div 
    className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}
    style={{ width }}
  />
);

const SkeletonCircle = ({ size = "w-12 h-12", className = "" }) => (
  <div className={`${size} bg-gray-200 rounded-full animate-pulse ${className}`} />
);

const TableSkeletonLayout = ({ rows = 5, columns = 4, showActions = true }) => (
  <div className="p-8">
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonText width="200px" className="h-8" />
          <SkeletonText width="300px" className="h-4" />
        </div>
        <div className="flex gap-3">
          <SkeletonBox width="200px" height="45px" className="rounded-xl" />
          <SkeletonBox width="120px" height="45px" className="rounded-xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex space-x-6">
            {[...Array(columns)].map((_, i) => (
              <SkeletonText key={i} width="100px" className="h-4" />
            ))}
            {showActions && <SkeletonText width="80px" className="h-4" />}
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="px-6 py-5 flex items-center space-x-6">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <SkeletonText width="60%" />
                <SkeletonText width="40%" />
              </div>
              <div className="flex-1 space-y-2">
                <SkeletonText width="80%" />
                <SkeletonText width="50%" />
              </div>
              <div className="flex-1">
                <SkeletonText width="70%" />
              </div>
              {showActions && (
                <div className="flex space-x-2">
                  <SkeletonCircle size="w-8 h-8" />
                  <SkeletonCircle size="w-8 h-8" />
                  <SkeletonCircle size="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DashboardSkeletonLayout = ({ statsCount = 4, itemsCount = 8, viewMode = 'grid' , user = null }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-6 py-8 animate-pulse">
      {
        user &&  <div className="mb-8">
        <SkeletonText width="300px" className="h-8 mb-2" />
        <SkeletonText width="400px" />
      </div>
      }
    

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(statsCount)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <SkeletonCircle size="w-12 h-12" />
              <SkeletonBox width="50px" height="24px" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <SkeletonText width="80px" className="h-8" />
              <SkeletonText width="100px" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <SkeletonText width="150px" className="h-6 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonBox key={index} width="100%" height="60px" className="rounded-xl" />
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <SkeletonText width="150px" className="h-6" />
            <SkeletonBox width="80px" height="30px" className="rounded-full" />
          </div>
          <div className="flex space-x-4">
            <SkeletonBox width="200px" height="40px" className="rounded-xl" />
            <SkeletonBox width="80px" height="40px" className="rounded-xl" />
          </div>
        </div>
      </div>

      {/* Items Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {[...Array(itemsCount)].map((_, index) => (
          <div key={index} className={`bg-white rounded-2xl shadow-sm border ${
            viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
          }`}>
            {viewMode === 'grid' ? (
              <div className="text-center space-y-4">
                <SkeletonBox width="100%" height="150px" className="rounded-xl" />
                <div className="space-y-2">
                  <SkeletonText width="80%" />
                  <SkeletonText width="60%" />
                </div>
                <SkeletonText width="100px" />
                <SkeletonText width="120px" />
              </div>
            ) : (
              <div className="flex items-center space-x-4 w-full">
                <SkeletonBox width="120px" height="80px" className="rounded-lg" />
                <div className="flex-1 space-y-2">
                  <SkeletonText width="70%" />
                  <SkeletonText width="90%" />
                  <div className="flex items-center space-x-4">
                    <SkeletonText width="60px" />
                    <SkeletonText width="100px" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);



export default function Skeleton({ 
  variant = 'table', 
  rows = 5, 
  columns = 4, 
  showActions = true,
  statsCount = 4,
  itemsCount = 8,
  viewMode = 'grid',
  user = null


}) {
  const skeletonVariants = {
    table: () => (
      <TableSkeletonLayout 
        rows={rows} 
        columns={columns} 
        showActions={showActions} 
      />
    ),
    dashboard: () => (
      <DashboardSkeletonLayout 
        statsCount={statsCount} 
        itemsCount={itemsCount} 
        viewMode={viewMode} 
        user={user}
      />
    ),


  };

  const SkeletonComponent = skeletonVariants[variant];
  
  if (!SkeletonComponent) {
    console.warn(`Skeleton variant "${variant}" not found. Using default table variant.`);
    return skeletonVariants.table();
  }

  return <SkeletonComponent />;
}
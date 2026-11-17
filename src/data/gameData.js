export const tleOrAcCards = [
  {
    id: 1,
    constraints: "N = 2 × 10⁵, Q = 2 × 10⁵, Time Limit: 1.0s",
    approach: "Sorting inside each range query: O(Q · N log N)",
    answer: "TLE",
    explanation: "~4 × 10¹⁰ ops → way beyond 10⁸ ops/sec threshold. Need Merge Sort Tree or Persistent Segment Tree for O(Q · log²N)."
  },
  {
    id: 2,
    constraints: "N = 10⁶, Time Limit: 2.0s",
    approach: "Sieve of Eratosthenes: O(N log log N)",
    answer: "AC",
    explanation: "~2 × 10⁷ ops. Sieve runs in near-linear time, well within 2s for N = 10⁶."
  },
  {
    id: 3,
    constraints: "N = 10⁵, Time Limit: 1.0s",
    approach: "Nested loop checking all pairs with std::map lookups: O(N² log N)",
    answer: "TLE",
    explanation: "~10¹⁰ · 17 ops (map constant factor ~17x). Using unordered_map reduces to O(N²) but still TLE. Need O(N log N) approach."
  },
  {
    id: 4,
    constraints: "N = 5 × 10⁵, T = 10, Time Limit: 3.0s",
    approach: "BFS from each node per test case: O(T · N)",
    answer: "AC",
    explanation: "~5 × 10⁶ total ops across all test cases. BFS is O(N + E) ≈ O(N) for trees, comfortably within limits."
  },
  {
    id: 5,
    constraints: "N = 10⁵, Time Limit: 1.0s",
    approach: "DP with bitmask over all subsets: O(2ᴺ)",
    answer: "TLE",
    explanation: "2¹⁰⁰⁰⁰⁰ ops, astronomically large. Need polynomial-time approach like greedy or divide & conquer."
  },
  {
    id: 6,
    constraints: "N = 2000, Time Limit: 2.0s",
    approach: "Floyd-Warshall all-pairs shortest path: O(N³)",
    answer: "AC",
    explanation: "~8 × 10⁹ ops but with tiny constant. 2000³ = 8 × 10⁹, tight but passes in 2s with simple operations (addition + comparison)."
  },
  {
    id: 7,
    constraints: "N = 10⁵ strings, total length = 10⁶, Time Limit: 2.0s",
    approach: "Sorting strings using std::sort with std::endl for output: O(N · L · log N)",
    answer: "TLE",
    explanation: "Sort itself is fine (~2 × 10⁷ ops), but std::endl flushes buffer N = 10⁵ times. Use '\\n' instead. endl causes ~100x slowdown on large output."
  },
  {
    id: 8,
    constraints: "N = 20, Time Limit: 2.0s",
    approach: "Bitmask DP over subsets: O(2ᴺ · N)",
    answer: "AC",
    explanation: "2²⁰ · 20 ≈ 2 × 10⁷ ops. Classic TSP/assignment DP. Well within limits for N ≤ 20."
  },
  {
    id: 9,
    constraints: "T = 10⁵ test cases, N = 10⁵ per case, Time Limit: 3.0s",
    approach: "memset(dp, 0, sizeof(dp)) inside each test case with dp[100001]: O(T · N)",
    answer: "TLE",
    explanation: "~10¹⁰ ops just from memset. Reset only the used portion of the array, or use a generation counter to avoid clearing."
  },
  {
    id: 10,
    constraints: "N = 10⁵, M = 10⁵ edges, Time Limit: 1.5s",
    approach: "Dijkstra with std::priority_queue: O((N + M) log N)",
    answer: "AC",
    explanation: "~3 × 10⁶ ops. Standard Dijkstra with binary heap is efficient for sparse graphs. Well within 1.5s."
  }
];

export const debugSnippets = [
  {
    id: 1,
    title: "Maximum Subarray Sum",
    constraint: "N ≤ 10⁵, a[i] ≤ 10⁹",
    code: [
      { line: 1, text: '#include <bits/stdc++.h>', buggy: false },
      { line: 2, text: 'using namespace std;', buggy: false },
      { line: 3, text: 'int main() {', buggy: false },
      { line: 4, text: '    int n; cin >> n;', buggy: false },
      { line: 5, text: '    vector<int> a(n);', buggy: false },
      { line: 6, text: '    for(int i = 0; i < n; i++) cin >> a[i];', buggy: false },
      { line: 7, text: '    int current_sum = 0, max_sum = 0;', buggy: true },
      { line: 8, text: '    for(int i = 0; i < n; i++) {', buggy: false },
      { line: 9, text: '        current_sum += a[i];', buggy: false },
      { line: 10, text: '        max_sum = max(max_sum, current_sum);', buggy: false },
      { line: 11, text: '        if(current_sum < 0) current_sum = 0;', buggy: false },
      { line: 12, text: '    }', buggy: false },
      { line: 13, text: '    cout << max_sum << endl;', buggy: false },
      { line: 14, text: '}', buggy: false },
    ],
    bugLine: 7,
    explanation: "Line 7: 'int current_sum' overflows 32-bit integer when N = 10⁵ and a[i] = 10⁹. Sum can reach 10¹⁴, exceeding INT_MAX (2.1 × 10⁹). Use 'long long' instead."
  },
  {
    id: 2,
    title: "Binary Search: Lower Bound",
    constraint: "N ≤ 10⁶, sorted array, find first element ≥ target",
    code: [
      { line: 1, text: '#include <bits/stdc++.h>', buggy: false },
      { line: 2, text: 'using namespace std;', buggy: false },
      { line: 3, text: 'int main() {', buggy: false },
      { line: 4, text: '    int n, target; cin >> n >> target;', buggy: false },
      { line: 5, text: '    vector<int> a(n);', buggy: false },
      { line: 6, text: '    for(int i = 0; i < n; i++) cin >> a[i];', buggy: false },
      { line: 7, text: '    int lo = 0, hi = n - 1, ans = -1;', buggy: false },
      { line: 8, text: '    while(lo <= hi) {', buggy: false },
      { line: 9, text: '        int mid = (lo + hi) / 2;', buggy: false },
      { line: 10, text: '        if(a[mid] >= target) {', buggy: false },
      { line: 11, text: '            ans = mid;', buggy: false },
      { line: 12, text: '            hi = mid;', buggy: true },
      { line: 13, text: '        } else lo = mid + 1;', buggy: false },
      { line: 14, text: '    }', buggy: false },
      { line: 15, text: '    cout << ans << endl;', buggy: false },
      { line: 16, text: '}', buggy: false },
    ],
    bugLine: 12,
    explanation: "Line 12: 'hi = mid' causes infinite loop when lo == hi == mid. Should be 'hi = mid - 1'. When a[mid] ≥ target, we save ans and must shrink the search space strictly."
  },
  {
    id: 3,
    title: "Knapsack DP",
    constraint: "N ≤ 100 items, W ≤ 10⁵ capacity",
    code: [
      { line: 1, text: '#include <bits/stdc++.h>', buggy: false },
      { line: 2, text: 'using namespace std;', buggy: false },
      { line: 3, text: 'int dp[100001];', buggy: false },
      { line: 4, text: 'int main() {', buggy: false },
      { line: 5, text: '    int n, W; cin >> n >> W;', buggy: false },
      { line: 6, text: '    vector<int> w(n), v(n);', buggy: false },
      { line: 7, text: '    for(int i = 0; i < n; i++)', buggy: false },
      { line: 8, text: '        cin >> w[i] >> v[i];', buggy: false },
      { line: 9, text: '    for(int i = 0; i < n; i++)', buggy: false },
      { line: 10, text: '        for(int j = w[i]; j <= W; j++)', buggy: true },
      { line: 11, text: '            dp[j] = max(dp[j], dp[j-w[i]] + v[i]);', buggy: false },
      { line: 12, text: '    cout << dp[W] << endl;', buggy: false },
      { line: 13, text: '}', buggy: false },
    ],
    bugLine: 10,
    explanation: "Line 10: Loop goes forward (j = w[i] to W), this is unbounded knapsack! For 0/1 knapsack, iterate backwards: 'for(int j = W; j >= w[i]; j--)' to prevent reusing the same item multiple times."
  }
];

export const topicPuzzles = [
  {
    id: 1,
    clues: [
      "N ≤ 10⁵ elements, Q ≤ 10⁵ static range queries, no updates",
      "Find minimum element in [L, R] in O(1) query time",
      "Operation min(x, x) = x is idempotent, so overlapping ranges don't affect correctness"
    ],
    options: ["Segment Tree", "Fenwick Tree", "Sparse Table", "DSU", "Sliding Window", "Binary Search"],
    answer: "Sparse Table",
    explanation: "Sparse Table leverages idempotent operations (min, max, GCD) to answer range queries in O(1) with O(N log N) preprocessing. No updates needed = perfect fit."
  },
  {
    id: 2,
    clues: [
      "N ≤ 10⁵ nodes, edges connect nodes in groups, Q ≤ 10⁵ online merge/query operations",
      "Determine if two nodes belong to the same connected component after each edge addition",
      "Path compression + union by rank gives nearly O(1) amortized per operation"
    ],
    options: ["Segment Tree", "Fenwick Tree", "Sparse Table", "DSU", "Sliding Window", "DFS/BFS"],
    answer: "DSU",
    explanation: "Disjoint Set Union (Union-Find) handles dynamic connectivity. With path compression + union by rank, it achieves O(α(N)) ≈ O(1) amortized per operation."
  },
  {
    id: 3,
    clues: [
      "Array of N ≤ 10⁵ elements, Q ≤ 10⁵ range sum queries with point updates",
      "Need to efficiently update a single element and query prefix/range sums",
      "Uses a clever bit manipulation trick: i += i & (-i) to traverse the implicit tree"
    ],
    options: ["Segment Tree", "Fenwick Tree", "Sparse Table", "DSU", "Mo's Algorithm", "Binary Search"],
    answer: "Fenwick Tree",
    explanation: "Fenwick Tree (BIT) handles point updates + prefix sum queries in O(log N) each. The 'i & (-i)' trick exploits the binary representation to navigate parent/child nodes."
  }
];

export const wordleWords = [
  {
    word: "KADANE",
    definition: "Kadane's Algorithm finds the maximum sum contiguous subarray in O(N) time using dynamic programming, tracking the best ending at each position.",
    link: "Read in CP Digest →"
  },
  {
    word: "SPARSE",
    definition: "Sparse Table is a data structure for idempotent range queries (min, max, GCD) with O(N log N) build and O(1) per query. No updates supported.",
    link: "Read in CP Digest →"
  },
  {
    word: "TOPO",
    definition: "Topological Sort orders vertices of a DAG so every directed edge u→v has u before v. Essential for dependency resolution and scheduling problems.",
    link: "Read in CP Digest →"
  }
];

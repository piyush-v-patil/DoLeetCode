
/* ====================================================================
   DATA & CONSTANTS (150+ Problems)
   ==================================================================== */
const RAW = [
  // Arrays / Strings
  {n:3,t:"Longest Substring Without Repeating Characters",d:"Medium",p:"Sliding Window",c:"Arrays"},
  {n:76,t:"Minimum Window Substring",d:"Hard",p:"Sliding Window",c:"Arrays"},
  {n:1004,t:"Max Consecutive Ones III",d:"Medium",p:"Sliding Window",c:"Arrays"},
  {n:904,t:"Fruit Into Baskets",d:"Medium",p:"Sliding Window",c:"Arrays"},
  {n:424,t:"Longest Repeating Character Replacement",d:"Medium",p:"Sliding Window",c:"Arrays"},
  {n:167,t:"Two Sum II",d:"Medium",p:"Two Pointers",c:"Arrays"},
  {n:11,t:"Container With Most Water",d:"Medium",p:"Two Pointers",c:"Arrays"},
  {n:15,t:"3Sum",d:"Medium",p:"Two Pointers",c:"Arrays"},
  {n:125,t:"Valid Palindrome",d:"Easy",p:"Two Pointers",c:"Arrays"},
  {n:42,t:"Trapping Rain Water",d:"Hard",p:"Two Pointers",c:"Arrays"},
  {n:560,t:"Subarray Sum Equals K",d:"Medium",p:"Prefix Sum",c:"Arrays"},
  {n:238,t:"Product of Array Except Self",d:"Medium",p:"Prefix Sum",c:"Arrays"},
  {n:1,t:"Two Sum",d:"Easy",p:"Hash Map",c:"Arrays"},
  {n:523,t:"Continuous Subarray Sum",d:"Medium",p:"Prefix Sum",c:"Arrays"},
  {n:142,t:"Linked List Cycle II",d:"Medium",p:"Fast & Slow",c:"Linked List"},
  {n:287,t:"Find the Duplicate Number",d:"Medium",p:"Fast & Slow",c:"Arrays"},
  {n:876,t:"Middle of the Linked List",d:"Easy",p:"Fast & Slow",c:"Linked List"},
  {n:202,t:"Happy Number",d:"Easy",p:"Fast & Slow",c:"Math"},
  {n:33,t:"Search in Rotated Sorted Array",d:"Medium",p:"Binary Search",c:"Arrays"},
  {n:153,t:"Find Minimum in Rotated Sorted Array",d:"Medium",p:"Binary Search",c:"Arrays"},
  {n:875,t:"Koko Eating Bananas",d:"Medium",p:"Binary Search",c:"Arrays"},
  {n:1011,t:"Capacity To Ship Packages Within D Days",d:"Medium",p:"Binary Search",c:"Arrays"},
  {n:4,t:"Median of Two Sorted Arrays",d:"Hard",p:"Binary Search",c:"Arrays"},
  {n:410,t:"Split Array Largest Sum",d:"Hard",p:"BS Answer Space",c:"Arrays"},
  {n:774,t:"Minimize Max Distance to Gas Station",d:"Hard",p:"BS Answer Space",c:"Arrays"},
  {n:1552,t:"Magnetic Force Between Two Balls",d:"Medium",p:"BS Answer Space",c:"Arrays"},
  {n:739,t:"Daily Temperatures",d:"Medium",p:"Monotonic Stack",c:"Arrays"},
  {n:84,t:"Largest Rectangle in Histogram",d:"Hard",p:"Monotonic Stack",c:"Arrays"},
  {n:503,t:"Next Greater Element II",d:"Medium",p:"Monotonic Stack",c:"Arrays"},
  {n:735,t:"Asteroid Collision",d:"Medium",p:"Stack",c:"Arrays"},
  {n:907,t:"Sum of Subarray Minimums",d:"Medium",p:"Monotonic Stack",c:"Arrays"},
  {n:56,t:"Merge Intervals",d:"Medium",p:"Intervals",c:"Arrays"},
  {n:253,t:"Meeting Rooms II",d:"Medium",p:"Intervals",c:"Arrays"},
  {n:57,t:"Insert Interval",d:"Medium",p:"Intervals",c:"Arrays"},
  {n:435,t:"Non-Overlapping Intervals",d:"Medium",p:"Intervals",c:"Arrays"},
  {n:53,t:"Maximum Subarray",d:"Medium",p:"Kadane",c:"Arrays"},
  {n:918,t:"Maximum Sum Circular Subarray",d:"Medium",p:"Kadane",c:"Arrays"},
  {n:121,t:"Best Time to Buy and Sell Stock",d:"Easy",p:"Kadane",c:"Arrays"},
  {n:179,t:"Largest Number",d:"Medium",p:"Sorting Tricks",c:"Arrays"},
  {n:621,t:"Task Scheduler",d:"Medium",p:"Sorting Tricks",c:"Arrays"},
  {n:452,t:"Minimum Number of Arrows",d:"Medium",p:"Sorting Tricks",c:"Arrays"},
  {n:54,t:"Spiral Matrix",d:"Medium",p:"Matrix",c:"Arrays"},
  {n:48,t:"Rotate Image",d:"Medium",p:"Matrix",c:"Arrays"},
  {n:73,t:"Set Matrix Zeroes",d:"Medium",p:"Matrix",c:"Arrays"},
  {n:74,t:"Search a 2D Matrix",d:"Medium",p:"Matrix",c:"Arrays"},
  {n:49,t:"Group Anagrams",d:"Medium",p:"Frequency Map",c:"Arrays"},
  {n:242,t:"Valid Anagram",d:"Easy",p:"Frequency Map",c:"Arrays"},
  {n:169,t:"Majority Element",d:"Easy",p:"Frequency Map",c:"Arrays"},
  {n:347,t:"Top K Frequent Elements",d:"Medium",p:"Frequency Map",c:"Arrays"},
  {n:75,t:"Sort Colors",d:"Medium",p:"Dutch Flag",c:"Arrays"},
  {n:283,t:"Move Zeroes",d:"Easy",p:"Two Pointers",c:"Arrays"},
  {n:448,t:"Find All Numbers Disappeared in Array",d:"Easy",p:"Cyclic Sort",c:"Arrays"},
  {n:442,t:"Find All Duplicates in Array",d:"Medium",p:"Cyclic Sort",c:"Arrays"},
  {n:41,t:"First Missing Positive",d:"Hard",p:"Cyclic Sort",c:"Arrays"},
  {n:394,t:"Decode String",d:"Medium",p:"String Parsing",c:"Strings"},
  {n:20,t:"Valid Parentheses",d:"Easy",p:"String Parsing",c:"Strings"},
  {n:227,t:"Basic Calculator II",d:"Medium",p:"String Parsing",c:"Strings"},
  {n:71,t:"Simplify Path",d:"Medium",p:"String Parsing",c:"Strings"},
  {n:206,t:"Reverse Linked List",d:"Easy",p:"LL Reversal",c:"Linked List"},
  {n:92,t:"Reverse Linked List II",d:"Medium",p:"LL Reversal",c:"Linked List"},
  {n:25,t:"Reverse Nodes in k-Group",d:"Hard",p:"LL Reversal",c:"Linked List"},
  {n:24,t:"Swap Nodes in Pairs",d:"Medium",p:"LL Reversal",c:"Linked List"},
  {n:542,t:"01 Matrix",d:"Medium",p:"Multi-Source BFS",c:"Graphs"},
  {n:994,t:"Rotting Oranges",d:"Medium",p:"Multi-Source BFS",c:"Graphs"},
  {n:286,t:"Walls and Gates",d:"Medium",p:"Multi-Source BFS",c:"Graphs"},
  {n:1926,t:"Nearest Exit From Entrance in Maze",d:"Medium",p:"BFS",c:"Graphs"},
  {n:215,t:"Kth Largest Element in Array",d:"Medium",p:"QuickSelect",c:"Arrays"},
  {n:973,t:"K Closest Points to Origin",d:"Medium",p:"QuickSelect",c:"Arrays"},
  {n:229,t:"Majority Element II",d:"Medium",p:"Boyer-Moore",c:"Arrays"},
  {n:187,t:"Repeated DNA Sequences",d:"Medium",p:"Rolling Hash",c:"Strings"},
  {n:1044,t:"Longest Duplicate Substring",d:"Hard",p:"Rolling Hash",c:"Strings"},
  {n:28,t:"Find the Index of the First Occurrence in a String",d:"Easy",p:"KMP/Z",c:"Strings"},
  {n:214,t:"Shortest Palindrome",d:"Hard",p:"KMP/Z",c:"Strings"},
  {n:459,t:"Repeated Substring Pattern",d:"Easy",p:"KMP/Z",c:"Strings"},
  {n:218,t:"The Skyline Problem",d:"Hard",p:"Line Sweep",c:"Strings"},
  {n:850,t:"Rectangle Area II",d:"Hard",p:"Line Sweep",c:"Arrays"},

  // Greedy
  {n:55,t:"Jump Game",d:"Medium",p:"Activity Selection",c:"Greedy"},
  {n:45,t:"Jump Game II",d:"Medium",p:"Activity Selection",c:"Greedy"},
  {n:134,t:"Gas Station",d:"Medium",p:"Gas Station",c:"Greedy"},
  {n:135,t:"Candy",d:"Hard",p:"Two-Pass Greedy",c:"Greedy"},
  {n:767,t:"Reorganize String",d:"Medium",p:"String Greedy",c:"Strings"},
  {n:402,t:"Remove K Digits",d:"Medium",p:"String Greedy",c:"Strings"},
  {n:1167,t:"Minimum Cost to Connect Sticks",d:"Medium",p:"Huffman",c:"Strings"},

  // Trees
  {n:102,t:"Binary Tree Level Order Traversal",d:"Medium",p:"Tree BFS",c:"Trees"},
  {n:103,t:"Binary Tree Zigzag Level Order Traversal",d:"Medium",p:"Tree BFS",c:"Trees"},
  {n:199,t:"Binary Tree Right Side View",d:"Medium",p:"Tree BFS",c:"Trees"},
  {n:111,t:"Minimum Depth of Binary Tree",d:"Easy",p:"Tree BFS",c:"Trees"},
  {n:116,t:"Populating Next Right Pointers",d:"Medium",p:"Tree BFS",c:"Trees"},
  {n:113,t:"Path Sum II",d:"Medium",p:"Tree DFS",c:"Trees"},
  {n:543,t:"Diameter of Binary Tree",d:"Easy",p:"Tree DFS",c:"Trees"},
  {n:101,t:"Symmetric Tree",d:"Easy",p:"Tree DFS",c:"Trees"},
  {n:226,t:"Invert Binary Tree",d:"Easy",p:"Tree DFS",c:"Trees"},
  {n:124,t:"Binary Tree Maximum Path Sum",d:"Hard",p:"Tree DFS",c:"Trees"},
  {n:236,t:"Lowest Common Ancestor of a Binary Tree",d:"Medium",p:"LCA",c:"Trees"},
  {n:235,t:"Lowest Common Ancestor of BST",d:"Easy",p:"LCA",c:"Trees"},
  {n:230,t:"Kth Smallest in BST",d:"Medium",p:"BST Ops",c:"Trees"},
  {n:98,t:"Validate Binary Search Tree",d:"Medium",p:"BST Ops",c:"Trees"},
  {n:173,t:"BST Iterator",d:"Medium",p:"BST Ops",c:"Trees"},
  {n:450,t:"Delete Node in BST",d:"Medium",p:"BST Ops",c:"Trees"},
  {n:297,t:"Serialize and Deserialize Binary Tree",d:"Hard",p:"Serialize",c:"Trees"},
  {n:449,t:"Serialize and Deserialize BST",d:"Medium",p:"Serialize",c:"Trees"},
  {n:208,t:"Implement Trie",d:"Medium",p:"Trie",c:"Trees"},
  {n:212,t:"Word Search II",d:"Hard",p:"Trie",c:"Trees"},
  {n:211,t:"Design Add and Search Words",d:"Medium",p:"Trie",c:"Trees"},
  {n:648,t:"Replace Words",d:"Medium",p:"Trie",c:"Trees"},
  {n:307,t:"Range Sum Query Mutable",d:"Medium",p:"Segment Tree",c:"Trees"},
  {n:315,t:"Count of Smaller Numbers After Self",d:"Hard",p:"Segment Tree",c:"Trees"},
  {n:105,t:"Construct Binary Tree from Preorder and Inorder",d:"Medium",p:"Tree Construction",c:"Trees"},
  {n:106,t:"Construct Binary Tree from Postorder and Inorder",d:"Medium",p:"Tree Construction",c:"Trees"},
  {n:94,t:"Binary Tree Inorder Traversal",d:"Easy",p:"Morris",c:"Trees"},
  {n:99,t:"Recover BST",d:"Medium",p:"Morris",c:"Trees"},
  {n:327,t:"Count of Range Sum",d:"Hard",p:"Merge Sort",c:"Trees"},

  // Graphs
  {n:127,t:"Word Ladder",d:"Hard",p:"Graph BFS",c:"Graphs"},
  {n:200,t:"Number of Islands",d:"Medium",p:"Graph DFS",c:"Graphs"},
  {n:547,t:"Number Provinces",d:"Medium",p:"Graph DFS",c:"Graphs"},
  {n:733,t:"Flood Fill",d:"Easy",p:"Graph DFS",c:"Graphs"},
  {n:417,t:"Pacific Atlantic Water Flow",d:"Medium",p:"Graph DFS",c:"Graphs"},
  {n:207,t:"Course Schedule",d:"Medium",p:"Topological Sort",c:"Graphs"},
  {n:210,t:"Course Schedule II",d:"Medium",p:"Topological Sort",c:"Graphs"},
  {n:269,t:"Alien Dictionary",d:"Hard",p:"Topological Sort",c:"Graphs"},
  {n:310,t:"Minimum Height Trees",d:"Medium",p:"Topological Sort",c:"Graphs"},
  {n:323,t:"Number of Connected Components",d:"Medium",p:"Union-Find",c:"Graphs"},
  {n:684,t:"Redundant Connection",d:"Medium",p:"Union-Find",c:"Graphs"},
  {n:721,t:"Accounts Merge",d:"Medium",p:"Union-Find",c:"Graphs"},
  {n:261,t:"Graph Valid Tree",d:"Medium",p:"Union-Find",c:"Graphs"},
  {n:743,t:"Network Delay Time",d:"Medium",p:"Dijkstra",c:"Graphs"},
  {n:787,t:"Cheapest Flights Within K Stops",d:"Medium",p:"Dijkstra",c:"Graphs"},
  {n:1631,t:"Path With Minimum Effort",d:"Medium",p:"Dijkstra",c:"Graphs"},
  {n:802,t:"Find Eventual Safe States",d:"Medium",p:"Cycle Detection",c:"Graphs"},
  {n:785,t:"Is Graph Bipartite",d:"Medium",p:"Bipartite",c:"Graphs"},
  {n:886,t:"Possible Bipartition",d:"Medium",p:"Bipartite",c:"Graphs"},
  {n:1334,t:"Find the City With the Smallest Number of Neighbors",d:"Medium",p:"Floyd-Warshall",c:"Graphs"},
  {n:1584,t:"Min Cost to Connect All Points",d:"Medium",p:"MST",c:"Graphs"},
  {n:332,t:"Reconstruct Itinerary",d:"Hard",p:"Eulerian",c:"Graphs"},
  {n:2097,t:"Valid Arrangement of Pairs",d:"Hard",p:"Eulerian",c:"Graphs"},
  {n:1192,t:"Critical Connections in a Network",d:"Hard",p:"SCC",c:"Graphs"},

  // Design
  {n:146,t:"LRU Cache",d:"Medium",p:"LRU Cache",c:"Design"},
  {n:460,t:"LFU Cache",d:"Hard",p:"LRU Cache",c:"Design"},
  {n:692,t:"Top K Frequent Words",d:"Medium",p:"Top-K Heap",c:"Heap"},
  {n:23,t:"Merge K Sorted Lists",d:"Hard",p:"Top-K Heap",c:"Heap"},
  {n:295,t:"Find Median From Data Stream",d:"Hard",p:"Two-Heap Median",c:"Heap"},
  {n:480,t:"Sliding Window Median",d:"Hard",p:"Two-Heap Median",c:"Heap"},
  {n:239,t:"Sliding Window Maximum",d:"Hard",p:"Sliding Window Max",c:"Design"},
  {n:1696,t:"Jump Game VI",d:"Medium",p:"Sliding Window Max",c:"Design"},
  {n:155,t:"Min Stack",d:"Easy",p:"Stack Design",c:"Design"},
  {n:150,t:"Evaluate Reverse Polish Notation",d:"Medium",p:"Stack Design",c:"Design"},
  {n:224,t:"Basic Calculator",d:"Hard",p:"Stack Design",c:"Design"},
  {n:341,t:"Flatten Nested List Iterator",d:"Medium",p:"Iterator Design",c:"Design"},
  {n:284,t:"Peeking Iterator",d:"Medium",p:"Iterator Design",c:"Design"},
  {n:355,t:"Design Twitter",d:"Medium",p:"Heap + Design",c:"Heap"},
  {n:1268,t:"Search Suggestions System",d:"Medium",p:"Trie Design",c:"Heap"},
  {n:677,t:"Map Sum Pairs",d:"Medium",p:"Trie Design",c:"Design"},
  {n:1206,t:"Design Skiplist",d:"Hard",p:"Skip List",c:"Design"},
  {n:382,t:"Linked List Random Node",d:"Medium",p:"Reservoir",c:"Design"},
  {n:528,t:"Random Pick With Weight",d:"Medium",p:"Prefix Sum + BS",c:"Design"},

  // Dynamic Programming
  {n:70,t:"Climbing Stairs",d:"Easy",p:"1D DP",c:"DP"},
  {n:198,t:"House Robber",d:"Medium",p:"1D DP",c:"DP"},
  {n:91,t:"Decode Ways",d:"Medium",p:"1D DP",c:"DP"},
  {n:746,t:"Min Cost Climbing Stairs",d:"Easy",p:"1D DP",c:"DP"},
  {n:322,t:"Coin Change",d:"Medium",p:"Knapsack",c:"DP"},
  {n:416,t:"Partition Equal Subset Sum",d:"Medium",p:"Knapsack",c:"DP"},
  {n:494,t:"Target Sum",d:"Medium",p:"Knapsack",c:"DP"},
  {n:1049,t:"Last Stone Weight II",d:"Medium",p:"Knapsack",c:"DP"},
  {n:1143,t:"Longest Common Subsequence",d:"Medium",p:"LCS",c:"DP"},
  {n:72,t:"Edit Distance",d:"Hard",p:"LCS",c:"DP"},
  {n:115,t:"Distinct Subsequences",d:"Hard",p:"LCS",c:"DP"},
  {n:1092,t:"Shortest Common Supersequence",d:"Hard",p:"LCS",c:"DP"},
  {n:300,t:"Longest Increasing Subsequence",d:"Medium",p:"LIS",c:"DP"},
  {n:354,t:"Russian Doll Envelopes",d:"Hard",p:"LIS",c:"DP"},
  {n:673,t:"Number of LIS",d:"Medium",p:"LIS",c:"DP"},
  {n:5,t:"Longest Palindromic Substring",d:"Medium",p:"Palindrome DP",c:"DP"},
  {n:647,t:"Palindromic Substrings",d:"Medium",p:"Palindrome DP",c:"DP"},
  {n:516,t:"Longest Palindromic Subsequence",d:"Medium",p:"Palindrome DP",c:"DP"},
  {n:132,t:"Palindrome Partitioning II",d:"Hard",p:"Palindrome DP",c:"DP"},
  {n:139,t:"Word Break",d:"Medium",p:"Word Break",c:"DP"},
  {n:140,t:"Word Break II",d:"Hard",p:"Word Break",c:"DP"},
  {n:472,t:"Concatenated Words",d:"Hard",p:"Word Break",c:"DP"},
  {n:312,t:"Burst Balloons",d:"Hard",p:"Interval DP",c:"DP"},
  {n:1130,t:"Minimum Cost Tree From Leaf Values",d:"Medium",p:"Interval DP",c:"DP"},
  {n:337,t:"House Robber III",d:"Medium",p:"Tree DP",c:"DP"},
  {n:698,t:"Partition to K Equal Sum Subsets",d:"Medium",p:"Bitmask DP",c:"DP"},
  {n:78,t:"Subsets",d:"Medium",p:"Backtracking",c:"DP"},
  {n:46,t:"Permutations",d:"Medium",p:"Backtracking",c:"DP"},
  {n:39,t:"Combination Sum",d:"Medium",p:"Backtracking",c:"DP"},
  {n:51,t:"N-Queens",d:"Hard",p:"Backtracking",c:"DP"},
  {n:37,t:"Sudoku Solver",d:"Hard",p:"Backtracking",c:"DP"},
  {n:131,t:"Palindrome Partitioning",d:"Medium",p:"Backtracking",c:"DP"},
  {n:62,t:"Unique Paths",d:"Medium",p:"Memoized Recursion",c:"DP"},
  {n:931,t:"Minimum Falling Path Sum",d:"Medium",p:"Memoized Recursion",c:"DP"},
  {n:1463,t:"Cherry Pickup II",d:"Hard",p:"Memoized Recursion",c:"DP"},
  {n:357,t:"Count Numbers With Unique Digits",d:"Medium",p:"Digit DP",c:"DP"},
  {n:123,t:"Best Time to Buy and Sell Stock III",d:"Hard",p:"Stock DP",c:"DP"},
  {n:309,t:"Best Time With Cooldown",d:"Medium",p:"Stock DP",c:"DP"},
  {n:714,t:"Best Time With Fee",d:"Medium",p:"Stock DP",c:"DP"},
  {n:241,t:"Different Ways to Add Parentheses",d:"Medium",p:"Divide & Conquer",c:"DP"},
  {n:282,t:"Expression Add Operators",d:"Hard",p:"Backtracking",c:"DP"},
  {n:454,t:"4Sum II",d:"Medium",p:"Meet in Middle",c:"DP"},
  {n:1425,t:"Constrained Subsequence Sum",d:"Hard",p:"Deque DP",c:"DP"},

  // Math / Bits
  {n:136,t:"Single Number",d:"Easy",p:"Bit Manipulation",c:"Math"},
  {n:191,t:"Number of 1 Bits",d:"Easy",p:"Bit Manipulation",c:"Math"},
  {n:190,t:"Reverse Bits",d:"Easy",p:"Bit Manipulation",c:"Math"},
  {n:268,t:"Missing Number",d:"Easy",p:"Bit Manipulation",c:"Math"},
  {n:204,t:"Count Primes",d:"Medium",p:"Math Tricks",c:"Math"},
  {n:264,t:"Ugly Number II",d:"Medium",p:"Math Tricks",c:"Math"},
  {n:1071,t:"GCD of Strings",d:"Easy",p:"Math Tricks",c:"Math"},
  {n:384,t:"Shuffle an Array",d:"Medium",p:"Randomization",c:"Math"},
  {n:470,t:"Implement Rand7 Using Rand5",d:"Medium",p:"Randomization",c:"Math"},
  {n:149,t:"Max Points on a Line",d:"Hard",p:"Geometry",c:"Math"},
  {n:118,t:"Pascal's Triangle",d:"Easy",p:"Combinatorics",c:"Math"},
];

const LEGENDARY = new Set([1,3,11,15,20,21,42,49,53,56,70,73,76,98,102,103,121,125,127,128,138,139,141,146,150,153,155,167,169,189,198,199,200,206,207,210,215,217,219,226,235,236,238,239,242,253,261,269,283,295,297,322,332,344,347,394,415,424,438,448,449,460,494,547,560,567,621,647,692,704,733,739,743,746,752,767,787,875,876,907,973,994,1004,1011,1143,1268,1631,1971]);
const PROBLEMS = RAW.map((r,i) => ({ id:i, n:r.n, t:r.t, d:r.d, p:r.p, c:r.c, starred:LEGENDARY.has(r.n) }));
const DIFF_CLASS = {Easy:"diff-easy", Medium:"diff-med", Hard:"diff-hard"};
const XP_VAL = {Easy:15, Medium:25, Hard:40};
const DAY_MS = 86400000;
const REVISION_INTERVAL_DAYS = 14;
const HEATMAP_DAYS = 89;
const MASTERY_STAGE = 4;
const COMBO_THRESHOLD = 3;
const COMBO_MULTIPLIER = 1.2;
const REVISION_XP = 10;
const SOLVELOG_MAX_AGE_YEARS = 1;
const STATE_VERSION = 1;

const SLUG_MAP = {"1":"two-sum","3":"longest-substring-without-repeating-characters","4":"median-of-two-sorted-arrays","5":"longest-palindromic-substring","11":"container-with-most-water","15":"3sum","20":"valid-parentheses","23":"merge-k-sorted-lists","24":"swap-nodes-in-pairs","25":"reverse-nodes-in-k-group","28":"find-the-index-of-the-first-occurrence-in-a-string","33":"search-in-rotated-sorted-array","37":"sudoku-solver","39":"combination-sum","41":"first-missing-positive","42":"trapping-rain-water","45":"jump-game-ii","46":"permutations","48":"rotate-image","49":"group-anagrams","51":"n-queens","53":"maximum-subarray","54":"spiral-matrix","55":"jump-game","56":"merge-intervals","57":"insert-interval","62":"unique-paths","70":"climbing-stairs","71":"simplify-path","72":"edit-distance","73":"set-matrix-zeroes","74":"search-a-2d-matrix","75":"sort-colors","76":"minimum-window-substring","78":"subsets","84":"largest-rectangle-in-histogram","91":"decode-ways","92":"reverse-linked-list-ii","94":"binary-tree-inorder-traversal","98":"validate-binary-search-tree","99":"recover-binary-search-tree","101":"symmetric-tree","102":"binary-tree-level-order-traversal","103":"binary-tree-zigzag-level-order-traversal","105":"construct-binary-tree-from-preorder-and-inorder-traversal","106":"construct-binary-tree-from-inorder-and-postorder-traversal","111":"minimum-depth-of-binary-tree","113":"path-sum-ii","115":"distinct-subsequences","116":"populating-next-right-pointers-in-each-node","118":"pascals-triangle","121":"best-time-to-buy-and-sell-stock","123":"best-time-to-buy-and-sell-stock-iii","124":"binary-tree-maximum-path-sum","125":"valid-palindrome","127":"word-ladder","131":"palindrome-partitioning","132":"palindrome-partitioning-ii","134":"gas-station","135":"candy","136":"single-number","139":"word-break","140":"word-break-ii","142":"linked-list-cycle-ii","146":"lru-cache","149":"max-points-on-a-line","150":"evaluate-reverse-polish-notation","153":"find-minimum-in-rotated-sorted-array","155":"min-stack","167":"two-sum-ii-input-array-is-sorted","169":"majority-element","173":"binary-search-tree-iterator","179":"largest-number","187":"repeated-dna-sequences","190":"reverse-bits","191":"number-of-1-bits","198":"house-robber","199":"binary-tree-right-side-view","200":"number-of-islands","202":"happy-number","204":"count-primes","206":"reverse-linked-list","207":"course-schedule","208":"implement-trie-prefix-tree","210":"course-schedule-ii","211":"design-add-and-search-words-data-structure","212":"word-search-ii","214":"shortest-palindrome","215":"kth-largest-element-in-an-array","218":"the-skyline-problem","224":"basic-calculator","226":"invert-binary-tree","227":"basic-calculator-ii","229":"majority-element-ii","230":"kth-smallest-element-in-a-bst","235":"lowest-common-ancestor-of-a-binary-search-tree","236":"lowest-common-ancestor-of-a-binary-tree","238":"product-of-array-except-self","239":"sliding-window-maximum","241":"different-ways-to-add-parentheses","242":"valid-anagram","253":"meeting-rooms-ii","261":"graph-valid-tree","264":"ugly-number-ii","268":"missing-number","269":"alien-dictionary","282":"expression-add-operators","283":"move-zeroes","284":"peeking-iterator","286":"walls-and-gates","287":"find-the-duplicate-number","295":"find-median-from-data-stream","297":"serialize-and-deserialize-binary-tree","300":"longest-increasing-subsequence","307":"range-sum-query-mutable","309":"best-time-to-buy-and-sell-stock-with-cooldown","310":"minimum-height-trees","312":"burst-balloons","315":"count-of-smaller-numbers-after-self","322":"coin-change","323":"number-of-connected-components-in-an-undirected-graph","327":"count-of-range-sum","332":"reconstruct-itinerary","337":"house-robber-iii","341":"flatten-nested-list-iterator","347":"top-k-frequent-elements","354":"russian-doll-envelopes","355":"design-twitter","357":"count-numbers-with-unique-digits","382":"linked-list-random-node","384":"shuffle-an-array","394":"decode-string","402":"remove-k-digits","410":"split-array-largest-sum","416":"partition-equal-subset-sum","417":"pacific-atlantic-water-flow","424":"longest-repeating-character-replacement","435":"non-overlapping-intervals","442":"find-all-duplicates-in-an-array","448":"find-all-numbers-disappeared-in-an-array","449":"serialize-and-deserialize-bst","450":"delete-node-in-a-bst","452":"minimum-number-of-arrows-to-burst-balloons","454":"4sum-ii","459":"repeated-substring-pattern","460":"lfu-cache","470":"implement-rand10-using-rand7","472":"concatenated-words","480":"sliding-window-median","494":"target-sum","503":"next-greater-element-ii","516":"longest-palindromic-subsequence","523":"continuous-subarray-sum","528":"random-pick-with-weight","542":"01-matrix","543":"diameter-of-binary-tree","547":"number-of-provinces","560":"subarray-sum-equals-k","621":"task-scheduler","647":"palindromic-substrings","648":"replace-words","673":"number-of-longest-increasing-subsequence","677":"map-sum-pairs","684":"redundant-connection","692":"top-k-frequent-words","698":"partition-to-k-equal-sum-subsets","714":"best-time-to-buy-and-sell-stock-with-transaction-fee","721":"accounts-merge","733":"flood-fill","735":"asteroid-collision","739":"daily-temperatures","743":"network-delay-time","746":"min-cost-climbing-stairs","767":"reorganize-string","774":"minimize-max-distance-to-gas-station","785":"is-graph-bipartite","787":"cheapest-flights-within-k-stops","802":"find-eventual-safe-states","850":"rectangle-area-ii","875":"koko-eating-bananas","876":"middle-of-the-linked-list","886":"possible-bipartition","904":"fruit-into-baskets","907":"sum-of-subarray-minimums","918":"maximum-sum-circular-subarray","931":"minimum-falling-path-sum","973":"k-closest-points-to-origin","994":"rotting-oranges","1004":"max-consecutive-ones-iii","1011":"capacity-to-ship-packages-within-d-days","1044":"longest-duplicate-substring","1049":"last-stone-weight-ii","1071":"greatest-common-divisor-of-strings","1092":"shortest-common-supersequence","1130":"minimum-cost-tree-from-leaf-values","1143":"longest-common-subsequence","1167":"minimum-cost-to-connect-sticks","1192":"critical-connections-in-a-network","1206":"design-skiplist","1268":"search-suggestions-system","1334":"find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance","1425":"constrained-subsequence-sum","1463":"cherry-pickup-ii","1552":"magnetic-force-between-two-balls","1584":"min-cost-to-connect-all-points","1631":"path-with-minimum-effort","1696":"jump-game-vi","1926":"nearest-exit-from-entrance-in-maze","2097":"valid-arrangement-of-pairs"};
function lcUrl(p){ return `https://leetcode.com/problems/${SLUG_MAP[p.n]}/`; }

const RANK_TITLES = ["NOVICE", "PLAYER 1", "CHALLENGER", "ARCADE RAT", "DEV MASTER", "HIGH SCORER", "SPEEDRUNNER", "BUG SLAYER", "GLITCH HUNTER", "ALGO GOD"];
const KILL_QUOTES = ["STAGE CLEAR", "PERFECT!", "COMBO EXTENDED", "YOU WIN", "NEW HIGH SCORE", "KO!"];

/* ====================================================================
   MISSION CONFIGURATION
   ==================================================================== */
const MISSION_CONFIG = {
  Easy:   { dTarget: 1, wTarget: 5,  dReward: 50,  wReward: 200 },
  Medium: { dTarget: 2, wTarget: 10, dReward: 75,  wReward: 300 },
  Hard:   { dTarget: 3, wTarget: 15, dReward: 100, wReward: 400 }
};
const DIFF_VAL = { Easy:1, Medium:2, Hard:3 };
const CATEGORIES = ["Arrays", "Strings", "Linked List", "Greedy", "Trees", "Graphs", "Heap", "Design", "DP", "Math"];

/* ====================================================================
   STATE MANAGEMENT (ULTRAChecked)
   ==================================================================== */
const STORE_KEY = "leetgrind_ultra_v7"; 
let STATE = loadState();

function defaultProblemState(){ return {status:"todo", doneAt:null, revisionStage:0, nextRevision:null, xpEarned:0}; }
function defaultState(){
  const ps={}; PROBLEMS.forEach(p=>{ if(!ps[p.n]) ps[p.n]=defaultProblemState(); });
  return {
    version: STATE_VERSION,
    xp:0, problems:ps, streak:0, lastSolveDate:null,
    combo: { active:false, count:0, lastTime:0 },
    settings: { audio:true, crt:false, missionDiff: 'Medium' },
    filters:{status:"all", diff:"all", cat:"all", pattern:"all", star:"all", search:"", sort:"diff", view:"grid"},
    solveLog:{}, achievements:{}, starredProblems:{},
    missions: { daily:{key:null, progress:0, done:false}, weekly:{key:null, progress:0, done:false} }
  };
}

function migrateState(s) {
  if(!s.version || s.version < 1) {
    if(s.lastSolveDate && !/^\d{4}-\d{2}-\d{2}$/.test(s.lastSolveDate)) {
      const d = new Date(s.lastSolveDate);
      if(!isNaN(d)) s.lastSolveDate = d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
      else s.lastSolveDate = null;
    }
    if(!s.starredProblems) s.starredProblems = {};
    if(s.filters && !s.filters.pattern) s.filters.pattern = "all";
    s.version = 1;
  }
  return s;
}

function pruneSolveLog(solveLog) {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - SOLVELOG_MAX_AGE_YEARS);
  const cutoffKey = cutoff.getFullYear()+"-"+String(cutoff.getMonth()+1).padStart(2,"0")+"-"+String(cutoff.getDate()).padStart(2,"0");
  for(const key in solveLog) {
    if(key < cutoffKey) delete solveLog[key];
  }
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return defaultState();
    const s = JSON.parse(raw);
    const fresh = defaultState();

    s.problems = {...fresh.problems, ...s.problems};
    s.settings = {...fresh.settings, ...s.settings};
    s.filters = {...fresh.filters, ...s.filters};
    s.combo = {...fresh.combo, ...s.combo};

    s.missions = s.missions || fresh.missions;
    if(s.missions.daily === undefined || typeof s.missions.daily.progress !== 'number') s.missions.daily = fresh.missions.daily;
    if(s.missions.weekly === undefined || typeof s.missions.weekly.progress !== 'number') s.missions.weekly = fresh.missions.weekly;

    if(!s.solveLog) s.solveLog = {};
    if(!s.achievements) s.achievements = {};
    if(!s.starredProblems) s.starredProblems = {};

    migrateState(s);
    pruneSolveLog(s.solveLog);

    return s;
  }catch(e){ return defaultState(); }
}
function saveState(){ localStorage.setItem(STORE_KEY,JSON.stringify(STATE)); }

/* ====================================================================
   ACHIEVEMENTS ENGINE (DYNAMIC)
   ==================================================================== */
let TROPHIES = [
  {id:"first", icon:"🗡️", name:"First Blood", desc:"Slay your first quest", check:()=>countSlain()>=1},
  {id:"ten", icon:"⚔️", name:"Mercenary", desc:"Slay 10 quests", check:()=>countSlain()>=10},
  {id:"fifty", icon:"👑", name:"Realm Conqueror", desc:"Slay 50 quests", check:()=>countSlain()>=50},
  {id:"streak3", icon:"🔥", name:"Kindled", desc:"3-day streak", check:()=>STATE.streak>=3},
  {id:"streak7", icon:"🌋", name:"Burning Soul", desc:"7-day streak", check:()=>STATE.streak>=7},
  {id:"goliath", icon:"💀", name:"David vs Goliath", desc:"Slay your first Hard quest", check:()=>PROBLEMS.some(p => p.d==="Hard" && STATE.problems[p.n].status!=="todo")},
  {id:"masochist", icon:"🩸", name:"Masochist", desc:"Slay 15 Hard quests", check:()=>PROBLEMS.filter(p => p.d==="Hard" && STATE.problems[p.n].status!=="todo").length>=15},
  {id:"warmup", icon:"☕", name:"Warmup Routine", desc:"Slay 25 Easy quests", check:()=>PROBLEMS.filter(p => p.d==="Easy" && STATE.problems[p.n].status!=="todo").length>=25},
  {id:"ascension", icon:"🌌", name:"Ascension", desc:"Attain MAX RANK on a quest", check:()=>Object.values(STATE.problems).some(p=>p.status==="mastered")},
  {id:"grandmaster", icon:"🧠", name:"Grandmaster", desc:"Attain MAX RANK on 10 quests", check:()=>Object.values(STATE.problems).filter(p=>p.status==="mastered").length>=10},
  {id:"clearmind", icon:"🧘", name:"Clear Mind", desc:"Zero pending reviews (min 10 solved)", check:()=>countSlain()>=10 && countDue()===0},
  {id:"bloodbath", icon:"🧛", name:"Bloodlust", desc:"Slay 5 quests in one day", check:()=>Object.values(STATE.solveLog).some(v=>v>=5)}
];

const PATTERNS = [...new Set(PROBLEMS.map(p=>p.p))].sort();
PATTERNS.forEach(pat => {
  const total = PROBLEMS.filter(p=>p.p===pat).length;
  if(total < 3) return; 
  const target = Math.max(1, Math.min(3, Math.floor(total * 0.5)));
  TROPHIES.push({
    id: "pat_" + pat.replace(/[^a-zA-Z]/g,""),
    icon: "🏅",
    name: pat + " Adept",
    desc: `Solve ${target} ${pat} quest${target>1?'s':''}`,
    check: () => PROBLEMS.filter(p => p.p === pat && STATE.problems[p.n].status !== "todo").length >= target
  });
});

function showAchievement(t) {
  setTimeout(()=>AudioSys.success(), 100);
  let container = document.getElementById("achieveContainer");
  if(!container) { container = document.createElement("div"); container.id = "achieveContainer"; container.className = "achieve-popup-container"; document.body.appendChild(container); }
  const el = document.createElement("div"); el.className = "achieve-popup";
  el.innerHTML = `<div class="achieve-icon">${t.icon}</div><div class="achieve-info"><div class="achieve-title">ACHIEVEMENT UNLOCKED!</div><div class="achieve-name">${t.name}</div><div class="achieve-desc">${t.desc}</div></div>`;
  container.appendChild(el);
  
  // Double-intensity explosion exactly where the center popup is placed
  setTimeout(() => particleBurst(el, "var(--neon-yellow)"), 50);
  setTimeout(() => particleBurst(el, "#ffffff"), 200);
  
  setTimeout(()=>el.remove(), 4000);
}

function checkTrophies(delayed = false) {
  let newUnlock = false;
  TROPHIES.forEach(t => {
    if(!STATE.achievements[t.id] && t.check()) {
      STATE.achievements[t.id] = Date.now();
      newUnlock = true;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        if(delayed) {
           setTimeout(() => showAchievement(t), 2300);
        } else {
           showAchievement(t);
        }
      }
    }
  });
  if(newUnlock) saveState();
}

/* ====================================================================
   AUDIO ENGINE
   ==================================================================== */
const AudioSys = {
  ctx: null,
  init() { if(!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
  play(freq, type, dur, vol=0.1) {
    if(!STATE.settings.audio) return;
    this.init();
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + dur);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + dur);
  },
  success() { this.play(800, 'square', 0.1); setTimeout(()=>this.play(1200, 'square', 0.2), 100); },
  hit() { this.play(150, 'sawtooth', 0.1, 0.2); setTimeout(()=>this.play(100, 'sawtooth', 0.2, 0.2), 50); },
  blip() { this.play(600, 'square', 0.05); }
};

/* ====================================================================
   LOGIC
   ==================================================================== */
function xpForLevel(lv){ return (lv<10)? 100 : (lv<20)? 200 : 300; }
function computeLevel(xp){ let lv=1, used=0; while(used+xpForLevel(lv)<=xp){ used+=xpForLevel(lv); lv++; if(lv>200) break; } return {level:lv, xpInLevel:xp-used, xpNeeded:xpForLevel(lv)}; }
function rankTitle(lv){ return RANK_TITLES[Math.min(lv-1, 9)] || "FELLOW"; }

function checkRevisions(){
  const now = Date.now();
  for(const n in STATE.problems){
    const p = STATE.problems[n];
    if((p.status==="done" || p.status==="revise") && p.nextRevision && now>p.nextRevision) { p.status="revise"; }
  }
}

function handleCombo(){
  const now = Date.now();
  if(now - STATE.combo.lastTime < DAY_MS) { STATE.combo.count++; if(STATE.combo.count >= COMBO_THRESHOLD) STATE.combo.active = true; }
  else { STATE.combo.count = 1; STATE.combo.active = false; }
  STATE.combo.lastTime = now;
}

function logSolve(){
  const today=new Date(); const key=today.getFullYear()+"-"+String(today.getMonth()+1).padStart(2,"0")+"-"+String(today.getDate()).padStart(2,"0");
  STATE.solveLog[key] = (STATE.solveLog[key]||0) + 1;
}

function dayKey(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function weekKey(){ const d=new Date(); const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())); t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7)); const wn=Math.ceil(((t-new Date(Date.UTC(t.getUTCFullYear(),0,1)))/86400000+1)/7); return t.getUTCFullYear()+"-W"+String(wn).padStart(2,"0"); }

function getMissionData(type) {
  const k = type === 'daily' ? dayKey() : weekKey();
  const diffSetting = STATE.settings.missionDiff || 'Medium';
  const conf = MISSION_CONFIG[diffSetting] || MISSION_CONFIG['Medium'];
  
  let h=0; for(let i=0;i<k.length;i++) h=(h*31+k.charCodeAt(i))|0;
  
  let target, reward, title, name, objType, objVal;
  if (type === 'daily') {
     reward = conf.dReward;
     title = "DAILY BOUNTY";
     // Focus on a Category but safely capped
     const cat = CATEGORIES[Math.abs(h) % CATEGORIES.length];
     const maxPossible = PROBLEMS.filter(p=>p.c===cat).length;
     target = Math.min(conf.dTarget, maxPossible);
     objType = 'cat'; objVal = cat;
     name = `Solve ${target} ${cat} Quests`;
  } else {
     target = conf.wTarget;
     reward = conf.wReward;
     title = "WEEKLY CRUSADE";
     const types = ['any', 'diff'];
     objType = types[Math.abs(h) % 2];
     if (objType === 'diff') {
        const diffs = ['Easy', 'Medium', 'Hard'];
        objVal = diffs[Math.abs(h+1) % 3];
        if(objVal === 'Hard') target = Math.max(1, Math.floor(target/2));
        name = `Solve ${target} ${objVal} Quests`;
     } else {
        objVal = 'any';
        name = `Complete ${target} Quests Total`;
     }
  }
  
  return { key: k, title, target, reward, name, objType, objVal };
}

function progressMissions(solvedProb){
  const dm = getMissionData('daily');
  const wm = getMissionData('weekly');
  
  if(STATE.missions.daily.key !== dm.key) STATE.missions.daily = {key: dm.key, progress: 0, done: false};
  if(STATE.missions.weekly.key !== wm.key) STATE.missions.weekly = {key: wm.key, progress: 0, done: false};
  
  let dKilled = false, wKilled = false;
  
  const matches = (prob, mission) => {
    if(mission.objType === 'cat') return prob.c === mission.objVal;
    if(mission.objType === 'diff') return prob.d === mission.objVal;
    return true; // 'any'
  };
  
  if(!STATE.missions.daily.done && matches(solvedProb, dm)){ 
    STATE.missions.daily.progress = Math.min(dm.target, STATE.missions.daily.progress + 1); 
    if(STATE.missions.daily.progress >= dm.target){ STATE.missions.daily.done = true; dKilled = true; } 
  }
  if(!STATE.missions.weekly.done && matches(solvedProb, wm)){ 
    STATE.missions.weekly.progress = Math.min(wm.target, STATE.missions.weekly.progress + 1); 
    if(STATE.missions.weekly.progress >= wm.target){ STATE.missions.weekly.done = true; wKilled = true; } 
  }
  return {dKilled, wKilled, dm, wm};
}

/* ============ FX ============ */
function flashScreen(){ const f=document.createElement("div"); f.className="flash"; document.body.appendChild(f); setTimeout(()=>f.remove(), 400); }
function particleBurst(el, colorHex){
  const r=el.getBoundingClientRect(); const cx=r.left+r.width/2, cy=r.top+r.height/2;
  for(let i=0; i<40; i++){
    const p=document.createElement("div"); p.className="particle"; p.style.color=colorHex; p.style.background="currentColor"; p.style.width=p.style.height=(4+Math.random()*8)+"px"; p.style.left=cx+"px"; p.style.top=cy+"px"; document.body.appendChild(p);
    const angle=Math.random()*Math.PI*2; const vel=150+Math.random()*300;
    p.animate([ {transform:`translate(-50%,-50%) scale(1)`, opacity:1}, {transform:`translate(calc(-50% + ${Math.cos(angle)*vel}px),calc(-50% + ${Math.sin(angle)*vel}px)) scale(0)`, opacity:0} ], {duration:800+Math.random()*400, easing:"cubic-bezier(.2,.7,.3,1)"}); setTimeout(()=>p.remove(), 1200);
  }
}
function floatText(el, text){
  const r=el.getBoundingClientRect(); const t=document.createElement("div"); t.className="float-text"; t.textContent=text; t.style.left=(r.left+r.width/2)+"px"; t.style.top=(r.top)+"px"; document.body.appendChild(t);
  t.animate([ {transform:"translate(-50%,-50%) scale(0)", opacity:0}, {transform:"translate(-50%,-100%) scale(1.5)", opacity:1, offset:0.15}, {transform:"translate(-50%,-120%) scale(1)", opacity:1, offset:0.3}, {transform:"translate(-50%,-200%) scale(1)", opacity:0} ], {duration:1500}); setTimeout(()=>t.remove(), 1500);
}
function killQuote(){ const q=document.createElement("div"); q.className="kill-quote"; q.textContent=KILL_QUOTES[Math.floor(Math.random()*KILL_QUOTES.length)]; document.body.appendChild(q); setTimeout(()=>q.remove(), 2000); }
function toast(text, isDanger=false){ const t=document.createElement("div"); t.className="toast"; if(isDanger) t.classList.add("danger"); t.textContent=text; document.body.appendChild(t); setTimeout(()=>t.remove(), 3200); }

/* ============ CORE ACTIONS ============ */
function cacheRect(el) {
  const rect = el.getBoundingClientRect();
  return { getBoundingClientRect: () => rect };
}

function recalcMissions() {
  const dm = getMissionData('daily');
  const wm = getMissionData('weekly');
  const todayStr = dayKey();
  const wk = weekKey();

  const matches = (prob, mission) => {
    if(mission.objType === 'cat') return prob.c === mission.objVal;
    if(mission.objType === 'diff') return prob.d === mission.objVal;
    return true;
  };

  let dProg = 0, wProg = 0;
  PROBLEMS.forEach(p => {
    const ps = STATE.problems[p.n];
    if(ps.status === "todo" || !ps.doneAt) return;
    const d = new Date(ps.doneAt);
    const dk = d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    if(STATE.missions.daily.key === dm.key && dk === todayStr && matches(p, dm)) dProg++;
    if(STATE.missions.weekly.key === wk && matches(p, wm)) wProg++;
  });

  STATE.missions.daily.progress = Math.min(dm.target, dProg);
  STATE.missions.daily.done = STATE.missions.daily.progress >= dm.target;
  STATE.missions.weekly.progress = Math.min(wm.target, wProg);
  STATE.missions.weekly.done = STATE.missions.weekly.progress >= wm.target;
}

function markDone(n, el) {
  AudioSys.hit();
  const ps = STATE.problems[n]; const prob = PROBLEMS.find(p=>p.n===n); if(!prob) return;
  const wasNew = ps.status==="todo";
  ps.status="done"; ps.doneAt=Date.now(); ps.revisionStage=0; ps.nextRevision=Date.now()+REVISION_INTERVAL_DAYS*DAY_MS;

  const dummyEl = cacheRect(el);

  handleCombo();
  let xp = XP_VAL[prob.d];
  if(STATE.combo.active) xp = Math.floor(xp * COMBO_MULTIPLIER);

  ps.xpEarned += xp;
  const oldLv = computeLevel(STATE.xp).level; STATE.xp += xp;

  if(wasNew){
    const kills = progressMissions(prob);
    if(kills.dKilled) STATE.xp += kills.dm.reward;
    if(kills.wKilled) STATE.xp += kills.wm.reward;
  }

  flashScreen(); particleBurst(dummyEl, "var(--neon-cyan)"); floatText(dummyEl, `+${xp} XP`); killQuote();
  logSolve(); updateStreak(); checkTrophies(true); saveState(); render();

  const newLv = computeLevel(STATE.xp).level;
  if(newLv > oldLv) {
    setTimeout(() => {
      const overlay=document.createElement("div"); overlay.className="levelup-overlay";
      overlay.innerHTML=`<div class="levelup-panel"><div class="top">LEVEL UP!</div><div class="main">RANK ${newLv}</div><div class="hint">CLICK TO CONTINUE</div></div>`;
      document.body.appendChild(overlay); overlay.addEventListener("click", ()=>overlay.remove());
      setTimeout(()=>AudioSys.success(), 500);
    }, 5000);
  }
}

function toggleRev(n) {
  AudioSys.blip();
  const panel = document.getElementById(`rev-${n}`);
  if(panel.classList.contains("open")) panel.classList.remove("open");
  else { document.querySelectorAll(".rev-panel").forEach(p=>p.classList.remove("open")); panel.classList.add("open"); }
}

function commitRev(n, diff, el) {
  AudioSys.success();
  const ps = STATE.problems[n];
  const dummyEl = cacheRect(el);

  if(diff==='easy') ps.revisionStage = Math.min(MASTERY_STAGE, ps.revisionStage+2);
  else if(diff==='norm') ps.revisionStage = Math.min(MASTERY_STAGE, ps.revisionStage+1);
  else ps.revisionStage = Math.max(0, ps.revisionStage-1);

  if(ps.revisionStage>=MASTERY_STAGE){ ps.status="mastered"; ps.nextRevision=null; }
  else { ps.status="done"; const days = diff==='easy'? REVISION_INTERVAL_DAYS : diff==='norm'? 7 : 1; ps.nextRevision=Date.now()+days*DAY_MS; }

  handleCombo();
  let xp = REVISION_XP; if(STATE.combo.active) xp = Math.floor(xp * COMBO_MULTIPLIER);
  ps.xpEarned += xp; STATE.xp += xp;

  particleBurst(dummyEl, "var(--warning)"); floatText(dummyEl, `+${xp} XP`);
  logSolve(); updateStreak(); checkTrophies(true); saveState(); render();
}

function undoProblem(n) {
  if(!confirm("Revert this problem? All earned XP will be removed.")) return;
  AudioSys.blip();
  STATE.xp = Math.max(0, STATE.xp - (STATE.problems[n].xpEarned||0));
  STATE.problems[n] = defaultProblemState();
  recalcMissions();
  saveState(); render();
}

function toggleStar(n) {
  AudioSys.blip();
  if(STATE.starredProblems[n]) delete STATE.starredProblems[n];
  else STATE.starredProblems[n] = true;
  saveState(); render();
}

function updateStreak(){
  const now = new Date();
  const todayStr = dayKey();
  const todayMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const last = STATE.lastSolveDate;
  if(last === todayStr) return;
  if(last && /^\d{4}-\d{2}-\d{2}$/.test(last)){
    const parts = last.split("-").map(Number);
    const lastMs = Date.UTC(parts[0], parts[1]-1, parts[2]);
    const diffDays = Math.round((todayMs - lastMs) / DAY_MS);
    if(diffDays === 1) STATE.streak++;
    else if(diffDays > 1) STATE.streak = 1;
  } else { STATE.streak = 1; }
  STATE.lastSolveDate = todayStr;
}

function countSlain(){ return Object.values(STATE.problems).filter(p=>p.status!=="todo").length; }
function countDue(){ return Object.values(STATE.problems).filter(p=>p.status==="revise").length; }

/* ====================================================================
   RENDERING
   ==================================================================== */

function populateProfileStats() {
  const lv = computeLevel(STATE.xp);
  document.getElementById('profileRankText').textContent = `${rankTitle(lv.level)} [LEVEL ${lv.level}]`;
  const pct = Math.min(100, Math.floor((lv.xpInLevel / lv.xpNeeded) * 100));
  document.getElementById('profileXpBar').style.width = pct + "%";
  document.getElementById('profileXpCur').textContent = lv.xpInLevel + " XP";
  document.getElementById('profileXpNext').textContent = lv.xpNeeded + " XP";

  document.getElementById('profileSolvedCount').textContent = countSlain();
  document.getElementById('profileMasteryCount').textContent = Object.values(STATE.problems).filter(p=>p.status==="mastered").length;
  document.getElementById('profileStreak').textContent = STATE.streak;
  document.getElementById('profileTrophyCount').textContent = Object.keys(STATE.achievements).length;
}

function applySettings() {
  document.body.className = STATE.settings.crt ? 'crt' : '';
  document.getElementById("toggleCrt").textContent = STATE.settings.crt ? "ON" : "OFF";
  document.getElementById("toggleAudio").textContent = STATE.settings.audio ? "ON" : "OFF";
  document.getElementById("ddMissionDiff").value = STATE.settings.missionDiff || 'Medium';
}

function updateSkillTree() {
  const catMap = { Arrays: "arr", "Linked List": "ll", Strings: "str", Heap: "heap", Math: "math", Trees: "tree", Graphs: "graph", Greedy: "greedy", Design: "design", DP: "dp" };
  const cats = { Arrays:0, "Linked List":0, Strings:0, Heap:0, Math:0, Trees:0, Graphs:0, Greedy:0, Design:0, DP:0 };
  const totals = { Arrays:0, "Linked List":0, Strings:0, Heap:0, Math:0, Trees:0, Graphs:0, Greedy:0, Design:0, DP:0 };
  PROBLEMS.forEach(p => { if(totals[p.c] !== undefined) { totals[p.c]++; if(STATE.problems[p.n].status!=='todo') cats[p.c]++; } });
  
  Object.keys(cats).forEach(k => {
    const el = document.getElementById(`tree-${catMap[k]}`);
    if(el) {
      const pct = Math.round(cats[k]/totals[k]*100); 
      el.textContent = pct + "%";
      const node = el.parentElement.parentElement;
      node.style.setProperty('--pct', pct + "%");
      if(pct === 100) node.style.boxShadow = `0 0 20px ${node.style.getPropertyValue('--node-color')}`;
      else node.style.boxShadow = `0 0 10px rgba(0,0,0,0.5)`;
    }
  });
}

let selectedRowIdx = -1;

function renderGrid() {
  const f = STATE.filters;
  const STATUS_MAP = { active: "todo", done: "done", revise: "revise", mastered: "mastered" };
  let filtered = PROBLEMS.filter(p => {
    const ps = STATE.problems[p.n];
    if(f.status !== "all" && ps.status !== STATUS_MAP[f.status]) return false;
    if(f.diff!=="all" && p.d!==f.diff) return false;
    if(f.cat!=="all" && p.c!==f.cat) return false;
    if(f.pattern && f.pattern!=="all" && p.p!==f.pattern) return false;
    if(f.star==="starred" && !LEGENDARY.has(p.n) && !STATE.starredProblems[p.n]) return false;
    if(f.search && !p.t.toLowerCase().includes(f.search.toLowerCase()) && !String(p.n).includes(f.search)) return false;
    return true;
  });

  document.getElementById("foundCount").textContent = filtered.length + " FOUND";

  const diffOrder = {Easy:0, Medium:1, Hard:2};
  filtered.sort((a,b) => {
    if(f.sort==="diff") return diffOrder[a.d]-diffOrder[b.d] || a.n-b.n;
    if(f.sort==="num") return a.n-b.n;
    return a.c.localeCompare(b.c) || a.n-b.n;
  });

  selectedRowIdx = -1;

  document.getElementById("grimoire").innerHTML = filtered.map((p,i) => {
    const ps = STATE.problems[p.n];
    const isStarred = LEGENDARY.has(p.n) || STATE.starredProblems[p.n];
    let sText="UNPLAYED", sCls="status-todo", next="—", undoSlot="<span></span>", actionSlot="";
    if(ps.status==="mastered"){ sText="MAX RANK"; sCls="status-mastered"; undoSlot=`<button class="btn-action btn-undo" data-action="undo" data-n="${p.n}">↺</button>`; actionSlot=`<span></span>`; }
    else if(ps.status==="revise" || ps.status==="done"){
      if(ps.status==="revise"){ sText="REVIEW!"; sCls="status-overdue"; next="NOW"; }
      else { sText="CLEARED"; sCls="status-done"; if(ps.nextRevision) next = Math.max(0, Math.ceil((ps.nextRevision-Date.now())/DAY_MS)) + "d"; }
      undoSlot=`<button class="btn-action btn-undo" data-action="undo" data-n="${p.n}">↺</button>`;
      actionSlot=`<button class="btn-action btn-forge" data-action="toggleRev" data-n="${p.n}">REVIEW</button>
      <div class="rev-panel" id="rev-${p.n}">
        <button class="btn-sr easy" data-action="commitRev" data-n="${p.n}" data-diff="easy">EASY(${REVISION_INTERVAL_DAYS}d)</button>
        <button class="btn-sr norm" data-action="commitRev" data-n="${p.n}" data-diff="norm">NORM(7d)</button>
        <button class="btn-sr hard" data-action="commitRev" data-n="${p.n}" data-diff="hard">HARD(1d)</button>
      </div>`;
    }
    else { actionSlot=`<button class="btn-action btn-slay" data-action="markDone" data-n="${p.n}">START</button>`; }

    return `<div class="row ${ps.status}" data-n="${p.n}">
      <div class="col-num">${i + 1}</div>
      <div class="col-diff ${DIFF_CLASS[p.d]}">${p.d}</div>
      <div class="col-star${isStarred?' starred':''}" data-star="${p.n}">${isStarred?'★':'☆'}</div>
      <div class="col-title">${p.t}</div>
      <div class="col-pattern">${p.p}</div>
      <div class="col-status ${sCls}">${sText}</div>
      <div class="col-next">${next}</div>
      <div class="col-action">${undoSlot}${actionSlot}<a class="lc-link" href="${lcUrl(p)}" target="_blank">LC ↗</a></div>
    </div>`;
  }).join("");
}

function render(){
  try {
    checkRevisions(); applySettings();
    
    const lv = computeLevel(STATE.xp);
    document.getElementById("lvlRoman").textContent = lv.level;
    document.getElementById("lvlTitle").textContent = rankTitle(lv.level);
    document.getElementById("xpCur").textContent = lv.xpInLevel; document.getElementById("xpNext").textContent = lv.xpNeeded;
    document.getElementById("xpBar").style.width = Math.min(100, (lv.xpInLevel/lv.xpNeeded*100)) + "%";
    const comboBadge = document.getElementById("comboBadge");
    comboBadge.textContent = COMBO_MULTIPLIER + "x COMBO!";
    comboBadge.classList.toggle("active", STATE.combo.active);
    document.getElementById("streakVal").textContent = STATE.streak;
    document.getElementById("slainVal").textContent = countSlain();
    document.getElementById("dueVal").textContent = countDue();
    document.getElementById("pctVal").textContent = Math.round(countSlain()/PROBLEMS.length*100) + "%";

    // Diff Tracker
    const counts = {Easy:{d:0,t:0}, Medium:{d:0,t:0}, Hard:{d:0,t:0}};
    PROBLEMS.forEach(p => { counts[p.d].t++; if(STATE.problems[p.n].status!=="todo") counts[p.d].d++; });
    document.getElementById("diffTracker").innerHTML = ["Easy","Medium","Hard"].map(d => {
      const c = counts[d]; const cls = d==="Medium"?"med":d.toLowerCase(); const pct = c.t ? Math.round(c.d/c.t*100) : 0;
      return `<div class="diff-card ${cls}"><div class="head"><span class="label">${d}</span><span class="nums"><b>${c.d}</b>/${c.t}</span></div><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div></div>`;
    }).join("");

    // Missions
    const dm = getMissionData('daily');
    const wm = getMissionData('weekly');
    
    // Safely check and render mission progress
    if(STATE.missions.daily.key !== dm.key) STATE.missions.daily = {key: dm.key, progress: 0, done: false};
    if(STATE.missions.weekly.key !== wm.key) STATE.missions.weekly = {key: wm.key, progress: 0, done: false};
    
    const md = STATE.missions.daily; const mw = STATE.missions.weekly;

    document.getElementById("missions").innerHTML = `
      <div class="mission ${md.done?'done':''}"><div class="mission-head"><div class="mission-icon">🎯</div><div class="mission-meta"><div class="mission-tier">${dm.title}</div><div class="mission-name">${dm.name}</div></div><div class="mission-reward">${dm.reward}<span>XP</span></div></div><div class="prog-bar-wrap"><div class="prog-bar-track"><div class="prog-bar-fill" style="width:${(md.progress/dm.target)*100}%"></div></div><div class="prog-bar-text">${md.done?'<b>CLEARED!</b>':`<b>${md.progress}</b>/${dm.target}`}</div></div></div>
      <div class="mission weekly ${mw.done?'done':''}"><div class="mission-head"><div class="mission-icon">🏆</div><div class="mission-meta"><div class="mission-tier">${wm.title}</div><div class="mission-name">${wm.name}</div></div><div class="mission-reward">${wm.reward}<span>XP</span></div></div><div class="prog-bar-wrap"><div class="prog-bar-track"><div class="prog-bar-fill" style="width:${(mw.progress/wm.target)*100}%"></div></div><div class="prog-bar-text">${mw.done?'<b>CLEARED!</b>':`<b>${mw.progress}</b>/${wm.target}`}</div></div></div>
      ${countDue()>0 ? `<div class="due-footer">[ ${countDue()} REVIEWS PENDING ]</div>` : ''}
    `;

    // Heatmap
    const today = new Date(); today.setHours(0,0,0,0); const start = new Date(today); start.setDate(start.getDate()-HEATMAP_DAYS); start.setDate(start.getDate()-start.getDay());
    let html="", active=0, week=0, month=0, best=0, total=0; const wStart=new Date(today); wStart.setDate(wStart.getDate()-6); const mStart=new Date(today); mStart.setDate(mStart.getDate()-29);
    for(let i=0; i<=HEATMAP_DAYS; i++){ const d=new Date(today); d.setDate(d.getDate()-i); const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); const c=STATE.solveLog[k]||0; total+=c; if(c>0) active++; if(c>best) best=c; if(d>=wStart) week+=c; if(d>=mStart) month+=c; }
    const hDays = Math.ceil((today-start)/DAY_MS)+1;
    for(let i=0; i<hDays; i++){ const d=new Date(start); d.setDate(d.getDate()+i); const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); const c=STATE.solveLog[k]||0; let l=0; if(c>=1) l=1; if(c>=3) l=2; if(c>=5) l=3; if(c>=8) l=4; html += `<div class="hm-cell lvl${l}" ${d>today?'style="opacity:0.1"':''} data-tip="${c} Solves on ${k}"></div>`; }
    document.getElementById("heatmap").innerHTML = html;
    
    const hmWrap = document.querySelector(".heatmap-wrap"); hmWrap.querySelectorAll(".heatmap-stats, .hm-legend").forEach(e=>e.remove());
    hmWrap.insertAdjacentHTML("afterbegin", `<div class="heatmap-stats"><div class="stat"><b>${week}</b><div class="lbl">7 DAYS</div></div><div class="stat"><b>${month}</b><div class="lbl">30 DAYS</div></div><div class="stat"><b>${total}</b><div class="lbl">${HEATMAP_DAYS+1} DAYS</div></div><div class="stat"><b>${best}</b><div class="lbl">HIGH SCORE</div></div></div>`);
    hmWrap.insertAdjacentHTML("beforeend", `<div class="hm-legend"><span>IDLE</span><div class="scale"><span style="background:var(--surface-hover)"></span><span style="background:rgba(0, 255, 102, 0.3)"></span><span style="background:rgba(0, 255, 102, 0.6)"></span><span style="background:var(--success)"></span><span style="background:var(--neon-cyan); box-shadow:0 0 5px var(--neon-cyan)"></span></div><span>ACTIVE</span></div>`);

    if(STATE.filters.view === "tree") {
      document.getElementById("grimoire").style.display = "none"; document.getElementById("treeView").style.display = "block";
      document.getElementById("viewToggle").textContent = "☰ GRID VIEW"; updateSkillTree();
    } else {
      document.getElementById("grimoire").style.display = "flex"; document.getElementById("treeView").style.display = "none";
      document.getElementById("viewToggle").textContent = "☍ TREE VIEW"; renderGrid();
    }

    // Trophies logic
    checkTrophies();
    document.getElementById("trophies").innerHTML = TROPHIES.map(t => {
      const unlocked = !!STATE.achievements[t.id];
      return `<div class="trophy ${unlocked?'unlocked':'locked'}"><div class="icon">${t.icon}</div><div class="info"><div class="name">${t.name}</div><div class="desc">${t.desc}</div></div></div>`;
    }).join("");
  } catch (error) {
    console.error("FATAL RENDER ERROR:", error);
    toast("A render error occurred. Please check console.", true);
  }
}

// BINDINGS
function updatePatternDropdown() {
  const c = STATE.filters.cat || "all";
  const pats = [...new Set(PROBLEMS.filter(p => c==="all" || p.c===c).map(p => p.p))].sort();
  const dd = document.getElementById("ddPattern");
  const current = STATE.filters.pattern || "all";
  dd.innerHTML = `<option value="all">ALL PATTERNS</option>` + pats.map(p => `<option value="${p}">${p.toUpperCase()}</option>`).join("");
  if(current !== "all" && !pats.includes(current)){ STATE.filters.pattern = "all"; dd.value = "all"; saveState(); }
  else { dd.value = current; }
}
updatePatternDropdown();

/* PATTERN_CODEX removed */

["ddStatus","ddDiff","ddCat","ddPattern","ddSort"].forEach(id => {
  const el = document.getElementById(id); const key = id.replace("dd","").toLowerCase(); el.value = STATE.filters[key] || "all";
  el.addEventListener("change", e => { 
    STATE.filters[key] = e.target.value; 
    if(key === "cat") updatePatternDropdown();
    saveState(); render(); 
  });
});

document.getElementById("viewToggle").addEventListener("click", () => { AudioSys.blip(); STATE.filters.view = STATE.filters.view === "tree" ? "grid" : "tree"; saveState(); render(); });
document.querySelectorAll(".tree-node").forEach(node => { node.addEventListener("click", () => { AudioSys.success(); STATE.filters.cat = node.dataset.cat; STATE.filters.view = "grid"; document.getElementById("ddCat").value = STATE.filters.cat; saveState(); render(); }); });

const stToggle = document.getElementById("starToggle"); stToggle.classList.toggle("active", STATE.filters.star==="starred");
stToggle.addEventListener("click", () => { AudioSys.blip(); STATE.filters.star = STATE.filters.star==="starred" ? "all" : "starred"; stToggle.classList.toggle("active", STATE.filters.star==="starred"); saveState(); render(); });
document.getElementById("searchBox").addEventListener("input", e => { STATE.filters.search=e.target.value; render(); });

// MODALS / SETTINGS
document.getElementById("trophyBtn").addEventListener("click", () => { AudioSys.blip(); document.getElementById("trophyModal").classList.add("open"); });
document.getElementById("btnProfile").addEventListener("click", () => { try { AudioSys.blip(); populateProfileStats(); document.getElementById("profileModal").classList.add("open"); } catch(e) { alert("PROFILE ERROR: " + e.message + " " + e.stack); } });
document.getElementById("btnSettings").addEventListener("click", () => { AudioSys.blip(); document.getElementById("settingsModal").classList.add("open"); });

document.getElementById("toggleCrt").addEventListener("click", () => { AudioSys.blip(); STATE.settings.crt = !STATE.settings.crt; saveState(); applySettings(); });
document.getElementById("toggleAudio").addEventListener("click", () => { STATE.settings.audio = !STATE.settings.audio; saveState(); applySettings(); AudioSys.blip(); });

document.getElementById("ddMissionDiff").addEventListener("change", (e) => { AudioSys.blip(); STATE.settings.missionDiff = e.target.value; saveState(); render(); });

document.getElementById("exportBtn").addEventListener("click", () => { AudioSys.blip(); const url = URL.createObjectURL(new Blob([JSON.stringify(STATE,null,2)], {type:"application/json"})); const a = document.createElement("a"); a.href=url; a.download="doleetcode_save.json"; a.click(); toast("SAVE EXPORTED!"); });
document.getElementById("resetBtn").addEventListener("click", () => { if(confirm("FORMAT MEMORY? All progress will be erased.")){ AudioSys.hit(); STATE=defaultState(); saveState(); render(); toast("MEMORY FORMATTED.", true); document.getElementById("settingsModal").classList.remove('open'); } });
document.getElementById("importBtn").addEventListener("click", () => { document.getElementById("importFile").click(); });
document.getElementById("importFile").addEventListener("change", e => {
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => { try { localStorage.setItem(STORE_KEY, ev.target.result); STATE = loadState(); saveState(); render(); toast("SAVE LOADED!"); document.getElementById("settingsModal").classList.remove('open'); } catch(err) { toast("INVALID SAVE FILE", true); } };
  reader.readAsText(file);
});

/* ============ EVENT DELEGATION ON GRIMOIRE ============ */
document.getElementById("grimoire").addEventListener("click", e => {
  const actionBtn = e.target.closest("[data-action]");
  if(actionBtn) {
    const action = actionBtn.dataset.action;
    const n = parseInt(actionBtn.dataset.n);
    const row = actionBtn.closest(".row");
    if(action === "markDone") markDone(n, row);
    else if(action === "toggleRev") toggleRev(n);
    else if(action === "commitRev") commitRev(n, actionBtn.dataset.diff, row);
    else if(action === "undo") undoProblem(n);
    return;
  }

  const starEl = e.target.closest(".col-star");
  if(starEl && starEl.dataset.star) { toggleStar(parseInt(starEl.dataset.star)); return; }

  const lcLink = e.target.closest(".lc-link");
  if(lcLink) { trackLCOpen(lcLink); }
});

/* ============ LC RETURN-FLOW ============ */
const LC_RETURN_DELAY = 15000;
let lcTracked = null; // { n: problemNumber, leftAt: timestamp }

function trackLCOpen(linkEl) {
  const row = linkEl.closest(".row");
  if(!row || !row.dataset.n) return;
  lcTracked = { n: parseInt(row.dataset.n), leftAt: Date.now() };
}

function closeReturnModal() {
  document.getElementById("returnModal").classList.remove("open");
  lcTracked = null;
}

function showReturnModal() {
  if(!lcTracked) return;
  const n = lcTracked.n;
  const prob = PROBLEMS.find(p => p.n === n);
  if(!prob) { lcTracked = null; return; }
  const ps = STATE.problems[n];

  AudioSys.blip();
  const body = document.getElementById("returnBody");

  if(ps.status === "mastered") {
    lcTracked = null;
    return;
  }

  if(ps.status === "todo") {
    body.innerHTML = `
      <div class="return-problem">#${n} — ${prob.t}</div>
      <div class="return-question">Did you solve this problem?</div>
      <div class="return-actions">
        <button class="return-btn yes" id="retYes">YES, SOLVED</button>
        <button class="return-btn no" id="retNo">NOT YET</button>
      </div>
      <div id="retRevisionStep" style="display:none;">
        <hr class="return-divider">
        <div class="return-sub">When do you want to revise?</div>
        <div class="return-actions">
          <button class="return-btn rev" data-ret-days="1">1 DAY</button>
          <button class="return-btn rev" data-ret-days="7">7 DAYS</button>
          <button class="return-btn rev" data-ret-days="${REVISION_INTERVAL_DAYS}">${REVISION_INTERVAL_DAYS} DAYS</button>
        </div>
      </div>`;
    document.getElementById("retYes").addEventListener("click", () => {
      document.getElementById("retYes").classList.add("active-rev");
      document.getElementById("retNo").style.display = "none";
      document.getElementById("retRevisionStep").style.display = "block";
    });
    document.getElementById("retNo").addEventListener("click", closeReturnModal);
    body.querySelectorAll("[data-ret-days]").forEach(btn => {
      btn.addEventListener("click", () => {
        const days = parseInt(btn.dataset.retDays);
        const ps2 = STATE.problems[n];
        ps2.status = "done"; ps2.doneAt = Date.now(); ps2.revisionStage = 0;
        ps2.nextRevision = Date.now() + days * DAY_MS;
        handleCombo();
        let xp = XP_VAL[prob.d];
        if(STATE.combo.active) xp = Math.floor(xp * COMBO_MULTIPLIER);
        ps2.xpEarned += xp; STATE.xp += xp;
        const kills = progressMissions(prob);
        if(kills.dKilled) STATE.xp += kills.dm.reward;
        if(kills.wKilled) STATE.xp += kills.wm.reward;
        logSolve(); updateStreak(); checkTrophies(true); saveState();
        closeReturnModal();
        flashScreen(); killQuote();
        render();
        toast(`+${xp} XP — Revision in ${days}d`);
      });
    });
  } else if(ps.status === "done" || ps.status === "revise") {
    body.innerHTML = `
      <div class="return-problem">#${n} — ${prob.t}</div>
      <div class="return-question">Did you revise this problem?</div>
      <div class="return-actions">
        <button class="return-btn yes" id="retRevYes">YES, REVISED</button>
        <button class="return-btn no" id="retRevNo">NOT YET</button>
      </div>
      <div id="retRevDetail" style="display:none;">
        <hr class="return-divider">
        <div class="return-sub">How did it go? When to revise again?</div>
        <div class="return-actions">
          <button class="return-btn rev" data-ret-rev="easy">EASY (${REVISION_INTERVAL_DAYS}d)</button>
          <button class="return-btn rev" data-ret-rev="norm">NORMAL (7d)</button>
          <button class="return-btn rev" data-ret-rev="hard">HARD (1d)</button>
        </div>
      </div>`;
    document.getElementById("retRevYes").addEventListener("click", () => {
      document.getElementById("retRevYes").classList.add("active-rev");
      document.getElementById("retRevNo").style.display = "none";
      document.getElementById("retRevDetail").style.display = "block";
    });
    document.getElementById("retRevNo").addEventListener("click", closeReturnModal);
    body.querySelectorAll("[data-ret-rev]").forEach(btn => {
      btn.addEventListener("click", () => {
        const diff = btn.dataset.retRev;
        const ps2 = STATE.problems[n];
        if(diff === 'easy') ps2.revisionStage = Math.min(MASTERY_STAGE, ps2.revisionStage + 2);
        else if(diff === 'norm') ps2.revisionStage = Math.min(MASTERY_STAGE, ps2.revisionStage + 1);
        else ps2.revisionStage = Math.max(0, ps2.revisionStage - 1);
        if(ps2.revisionStage >= MASTERY_STAGE) { ps2.status = "mastered"; ps2.nextRevision = null; }
        else { ps2.status = "done"; const days = diff === 'easy' ? REVISION_INTERVAL_DAYS : diff === 'norm' ? 7 : 1; ps2.nextRevision = Date.now() + days * DAY_MS; }
        handleCombo();
        let xp = REVISION_XP; if(STATE.combo.active) xp = Math.floor(xp * COMBO_MULTIPLIER);
        ps2.xpEarned += xp; STATE.xp += xp;
        logSolve(); updateStreak(); checkTrophies(true); saveState();
        closeReturnModal();
        render();
        toast(`+${xp} XP — Review logged`);
      });
    });
  }

  document.getElementById("returnModal").classList.add("open");
}

document.getElementById("returnModalClose").addEventListener("click", closeReturnModal);

document.addEventListener("visibilitychange", () => {
  if(document.visibilityState === "visible" && lcTracked) {
    const elapsed = Date.now() - lcTracked.leftAt;
    if(elapsed >= LC_RETURN_DELAY) {
      setTimeout(() => showReturnModal(), 300);
    } else {
      lcTracked = null;
    }
  }
});

/* ============ KEYBOARD SHORTCUTS ============ */
function highlightRow(rows) {
  rows.forEach(r => r.classList.remove("kb-selected"));
  if(selectedRowIdx >= 0 && selectedRowIdx < rows.length) {
    rows[selectedRowIdx].classList.add("kb-selected");
    rows[selectedRowIdx].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

document.addEventListener("keydown", e => {
  if(e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(modal => modal.classList.remove("open"));
    selectedRowIdx = -1;
    document.querySelectorAll(".row.kb-selected").forEach(r => r.classList.remove("kb-selected"));
    return;
  }

  if(document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "SELECT") return;
  if(document.querySelector(".modal-overlay.open")) return;

  const rows = document.querySelectorAll("#grimoire .row");
  if(!rows.length) return;

  if(e.key === "j" || e.key === "ArrowDown") {
    e.preventDefault();
    selectedRowIdx = Math.min(selectedRowIdx + 1, rows.length - 1);
    highlightRow(rows);
  }
  else if(e.key === "k" || e.key === "ArrowUp") {
    e.preventDefault();
    selectedRowIdx = Math.max(selectedRowIdx - 1, 0);
    highlightRow(rows);
  }
  else if(e.key === "Enter" && selectedRowIdx >= 0 && selectedRowIdx < rows.length) {
    e.preventDefault();
    const row = rows[selectedRowIdx];
    const btn = row.querySelector(".btn-slay") || row.querySelector(".btn-forge");
    if(btn) btn.click();
  }
  else if(e.key === "/" ) {
    e.preventDefault();
    document.getElementById("searchBox").focus();
  }
});

render();

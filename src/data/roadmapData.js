export const roadmapLevels = [
  {
    id: "level-0",
    level: "Level 0",
    badge: "L0",
    phase: "Foundations",
    accentColor: "#f5ba13",
    tagColor: "border-[#f5ba13]/40 text-[#f5ba13] bg-[#f5ba13]/10",
    description: "Builds essential programming skills and basic problem-solving thinking. Great for beginners or anyone new to competitive coding.",
    weeks: [
      {
        week: "Week 01",
        title: "Programming Basics",
        focus: "Learn the building blocks of programs.",
        videoTitle: "Intro Video (Data Types & Conditions)",
        videoUrl: "https://youtu.be/rgcsNzDkVWg?si=4C_J4hiM0BWJoktP",
        topics: ["Variables & data types", "Input / output", "Conditionals (if, else)", "Basic logic thinking"]
      },
      {
        week: "Week 02",
        title: "Loops",
        focus: "Repeat work effectively in code.",
        videoTitle: "Loops Tutorial",
        videoUrl: "https://youtu.be/2RhOQIUam2o?si=2AcbWq1wHXPLxU_L",
        topics: ["for, while, do-while", "Loop control (break, continue)", "Loop patterns in problems"]
      },
      {
        week: "Week 03",
        title: "Arrays & Strings",
        focus: "Organize and store collections of values.",
        videoTitle: "Arrays Video",
        videoUrl: "https://youtu.be/_5lxC83xgrI?si=KG9LMw2S5pWv0FbY",
        topics: ["1D arrays", "2D arrays", "Basic string handling", "Traversal & basic operations"]
      },
      {
        week: "Week 04",
        title: "Functions",
        focus: "Structure code into reusable blocks.",
        videoTitle: "Functions Video",
        videoUrl: "https://youtu.be/m4XdbgHrHk4?si=wej3Zn_y7rslaH_a",
        topics: ["Writing and calling functions", "Parameters and return values", "Modular code basics"]
      },
      {
        week: "Week 05",
        title: "STLs 1",
        focus: "Using C++ Standard Library for faster problem solving.",
        videoTitle: "STLs 1 Video",
        videoUrl: "https://youtu.be/fm-6-XJGWCs?si=HlCD5dB_mqyC_DIj",
        topics: ["Pair", "Stack", "Queue", "Vector", "Deque", "Problem solving with STL basics"]
      },
      {
        week: "Week 06",
        title: "STL 2",
        focus: "Efficient data structure usage.",
        videoTitle: "STLs 2 Video",
        videoUrl: "https://youtu.be/gpxR2IMjSA0?si=9ByBT1tAdVvLVIIW",
        topics: ["Vector", "Set", "Map", "Unordered map", "Problem solving with STL advanced"]
      },
      {
        week: "Week 07",
        title: "Mathematics 1",
        focus: "Apply math in code.",
        topics: ["GCD & LCM", "Math logic for problems"]
      },
      {
        week: "Week 08",
        title: "Mathematics 2",
        focus: "Logic + math.",
        topics: ["Factorials", "Counting basics (nCr)", "Simple combinatorics"]
      },
      {
        week: "Week 09",
        title: "Ad-hoc 1",
        focus: "Observation-based problem solving.",
        topics: ["Simple problem patterns", "Prefix sums", "Frequency arrays"]
      },
      {
        week: "Week 10",
        title: "Ad-hoc 2",
        focus: "Efficiency without heavy theory.",
        topics: ["Two pointers", "Sliding window", "Brute patterns"]
      },
      {
        week: "Week 11",
        title: "Practice Week 1",
        focus: "Confidence and repetition.",
        topics: ["Mixed problems practice", "Applying Level 0 ideas together"]
      },
      {
        week: "Week 12",
        title: "Review",
        focus: "Prep for Level 1.",
        topics: ["Revision of all Level 0 topics", "Internal mini contest style recap"]
      }
    ]
  },
  {
    id: "level-1",
    level: "Level 1",
    badge: "L1",
    phase: "Intermediate",
    accentColor: "#38bdf8",
    tagColor: "border-[#38bdf8]/40 text-[#38bdf8] bg-[#38bdf8]/10",
    description: "Focuses on core algorithms and techniques used in typical contests. You'll start thinking in patterns and solving more structured problems.",
    weeks: [
      {
        week: "Week 01",
        title: "Binary Search",
        focus: "Finding values systematically & searching on answer.",
        topics: ["Finding values systematically", "Lower & upper bound ideas", "Search on answer pattern"]
      },
      {
        week: "Week 02",
        title: "Number Theory 1",
        focus: "Primes, sieves, and factorizations.",
        topics: ["Prime sieve", "Fast factorization basics"]
      },
      {
        week: "Week 03",
        title: "Number Theory 2",
        focus: "Modular arithmetic, inverses, and powers.",
        topics: ["Modular exponentiation", "Inverses & modular logic"]
      },
      {
        week: "Week 04",
        title: "Bitmasking",
        focus: "Bitwise logic and state representation.",
        topics: ["Bit operations", "Representing subsets", "Mask-based states"]
      },
      {
        week: "Week 05",
        title: "Complete Search",
        focus: "Smart exhaustive search and pruning.",
        topics: ["Exhaustive search", "Pruning ideas", "Smart brute forcing"]
      },
      {
        week: "Week 06",
        title: "Recursion",
        focus: "Recursive call trees and stack logic.",
        topics: ["Recursive thinking", "Stack logic", "Base cases & patterns"]
      },
      {
        week: "Week 07",
        title: "Backtracking",
        focus: "Generating valid combinations and permutations under constraints.",
        topics: ["Generating combinations", "Constraint-based recursion"]
      },
      {
        week: "Week 08",
        title: "Brute Force",
        focus: "Speeding up naive search spaces effectively.",
        topics: ["Problem exploration", "Speed up naive approaches"]
      },
      {
        week: "Week 09",
        title: "Graphs 1",
        focus: "Representing graphs and foundational graph traversals.",
        topics: ["Graph representation", "BFS", "DFS"]
      },
      {
        week: "Week 10",
        title: "Graphs 2",
        focus: "Connected components and practical traversal applications.",
        topics: ["Connected components", "Graph traversal use cases"]
      },
      {
        week: "Week 11",
        title: "Dynamic Programming 1",
        focus: "Memoization and basic recurrence relations.",
        topics: ["Basic DP patterns", "Memoization"]
      },
      {
        week: "Week 12",
        title: "Dynamic Programming 2",
        focus: "Tabulation and state transitions.",
        topics: ["Tabulation", "Transition building"]
      }
    ]
  },
  {
    id: "level-2",
    level: "Level 2",
    badge: "L2",
    phase: "Advanced",
    accentColor: "#c084fc",
    tagColor: "border-[#c084fc]/40 text-[#c084fc] bg-[#c084fc]/10",
    description: "Targets complex algorithms and ICPC-style problem solving. This level prepares you for real contests with advanced techniques and data structures.",
    weeks: [
      {
        week: "Week 01",
        title: "Advanced DP 1",
        focus: "Interval DP and range-based patterns.",
        topics: ["Interval DP", "Range patterns"]
      },
      {
        week: "Week 02",
        title: "Advanced DP 2",
        focus: "Bitmask DP and traveling salesman patterns.",
        topics: ["DP with bitmasking", "TSP patterns"]
      },
      {
        week: "Week 03",
        title: "Advanced DP 3",
        focus: "Digit DP and hybrid state constructions.",
        topics: ["Digit DP", "Hybrid DP techniques"]
      },
      {
        week: "Week 04",
        title: "DP Optimization",
        focus: "Memory compression and state reduction tricks.",
        topics: ["Memory / time optimization", "Speed-up tricks"]
      },
      {
        week: "Week 05",
        title: "Graphs 3",
        focus: "Single-source shortest paths on weighted graphs.",
        topics: ["Dijkstra's algorithm", "Shortest path logic"]
      },
      {
        week: "Week 06",
        title: "Graphs 4",
        focus: "All-pairs shortest paths and negative edge handling.",
        topics: ["Bellman-Ford", "Floyd-Warshall"]
      },
      {
        week: "Week 07",
        title: "Graphs 5",
        focus: "Topological sorting and DAG applications.",
        topics: ["Topological sort", "DAG applications"]
      },
      {
        week: "Week 08",
        title: "Segment Trees",
        focus: "Range query updates and lazy propagation.",
        topics: ["Range queries", "Lazy propagation"]
      },
      {
        week: "Week 09",
        title: "Fenwick Tree",
        focus: "Binary indexed tree prefix frequency operations.",
        topics: ["Binary Indexed Tree", "Frequency queries"]
      },
      {
        week: "Week 10",
        title: "Game Theory 1",
        focus: "Impartial games, Nim-sum, and Grundy basics.",
        topics: ["Nim game", "Grundy number basics"]
      },
      {
        week: "Week 11",
        title: "Game Theory 2",
        focus: "Sprague-Grundy theorem and composite games.",
        topics: ["Sprague-Grundy theorem", "Advanced game logic"]
      },
      {
        week: "Week 12",
        title: "Advanced Math",
        focus: "Combinatorics and advanced number theoretic algorithms.",
        topics: ["Modular combinatorics", "Number theory tricks"]
      }
    ]
  }
]


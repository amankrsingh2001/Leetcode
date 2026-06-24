import { prisma } from "@/lib/prisma";
import { Difficulty, Prisma } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();




const initData: Prisma.ProblemCreateInput[] = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    metaData: {
     create:{
        leetcodeUrl: "https://leetcode.com/problems/two-sum/",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9"
      ],

      testCases: {
       create: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
       {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 2 + 4 == 6, we return their indices [1, 2]. Note that we cannot use nums[0] twice (3 + 3 = 6) because the problem rules state each element can only be used once."
        }
      ]
      }
    }
     }
  },
  {
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "topic": "Stacks",
    "companies": ["Meta", "Amazon", "Microsoft", "Bloomberg"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
        "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
        "constraints": [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'."
        ],
        "testCases": {
          "create": [
            {
              "input": "s = \"()\"",
              "output": "true",
              "explanation": "The open bracket '(' is immediately closed by its corresponding closing bracket ')'."
            },
            {
              "input": "s = \"()[]{}\"",
              "output": "true",
              "explanation": "Every open bracket is closed sequentially by its matching closing bracket in the correct order."
            },
            {
              "input": "s = \"(]\"",
              "output": "false",
              "explanation": "The open bracket '(' is followed by a closing square bracket ']', which does not match."
            }
          ]
        }
      }
    }
  },
  {
    "title": "LRU Cache",
    "difficulty": "Medium",
    "topic": "Design",
    "companies": ["Amazon", "Google", "Microsoft", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/lru-cache/",
        "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put methods operating in O(1) time complexity.",
        "constraints": [
          "1 <= capacity <= 3000",
          "0 <= key <= 10^4",
          "At most 2 * 10^5 calls will be made to get and put."
        ],
        "testCases": {
          "create": [
            {
              "input": "[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\"]\\n[[2], [1, 1], [2, 2], [1], [3, 3], [2]]",
              "output": "[null, null, null, 1, null, -1]",
              "explanation": "Initialize cache with capacity 2. put(1, 1) and put(2, 2) add elements. get(1) returns 1 and makes key 1 the most recently used. put(3, 3) evicts the least recently used key 2. get(2) returns -1 because it was evicted."
            }
          ]
        }
      }
    }
  },
  {
    "title": "Number of Islands",
    "difficulty": "Medium",
    "topic": "Graphs",
    "companies": ["Amazon", "Microsoft", "Google", "Uber"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
        "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        "constraints": [
          "m == grid.length",
          "n == grid[i].length",
          "1 <= m, n <= 300"
        ],
        "testCases": {
          "create": [
            {
              "input": "grid = [[\"1\",\"1\",\"1\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"0\"]]",
              "output": "1",
              "explanation": "All land cells ('1') are interconnected horizontally or vertically, forming a single continuous landmass surrounded entirely by water."
            }
          ]
        }
      }
    }
  },
  {
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topic": "Two Pointers",
    "companies": ["Amazon", "Google", "Goldman Sachs"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
        "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        "constraints": [
          "n == height.length",
          "1 <= n <= 2 * 10^4",
          "0 <= height[i] <= 10^5"
        ],
        "testCases": {
          "create": [
            {
              "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
              "output": "6",
              "explanation": "The elevation map traps water between blocks of varying heights. Water is trapped at index 2 (1 unit), index 4 (1 unit), index 5 (2 units), index 6 (1 unit), and index 9 (1 unit), totaling 6 units."
            }
          ]
        }
      }
    }
  }
]
const seedDb = async(initData:Prisma.ProblemCreateInput[])=>{
    try {
        console.log("DB URL:", process.env.DATABASE_URL);
        for(let problems of initData){
            await prisma.problem.create({data:problems})
        }
    } catch (error) {
        console.log(error)
    }
}

seedDb(initData);
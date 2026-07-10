import { prisma } from "@/lib/prisma";
import { Difficulty, Prisma } from "@prisma/client";
import { title } from "process";

import slugify from "slugify"

type SeedProblem = Omit<Prisma.ProblemCreateInput, "slug">;
const initData: SeedProblem[] = [
{
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "companies": ["Amazon", "Google", "Meta", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
        "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target...",
        "constraints": [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [2, 7, 11, 15],
            "target": 9
          },
          "expected": [0, 1],
          "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          "input": {
            "nums": [3, 2, 4],
            "target": 6
          },
          "expected": [1, 2],
          "explanation": "Because nums[1] + nums[2] == 6."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "twoSum",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "number"
          }
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "target",
            "type": {
              "kind": "number"
            }
          }
        ]
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
        "description": "Given a string s containing just the characters...",
        "constraints": [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "s": "()"
          },
          "expected": true,
          "explanation": "The open bracket '(' is immediately closed by its corresponding closing bracket ')'."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "isValid",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "s",
            "type": {
              "kind": "string"
            }
          }
        ]
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
        "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache...",
        "constraints": [
          "1 <= capacity <= 3000",
          "0 <= key <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "methods": ["LRUCache", "put"],
            "arguments": [[2], [1, 1]]
          },
          "expected": [null, null],
          "explanation": "Initialize cache with capacity 2."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "LRUCache",
        "returnType": {
          "kind": "void"
        },
        "parameters": [
          {
            "name": "capacity",
            "type": {
              "kind": "number"
            }
          }
        ]
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
        "description": "Given an m x n 2D binary grid grid which represents a map...",
        "constraints": [
          "m == grid.length",
          "n == grid[i].length"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "grid": [["1", "1"]]
          },
          "expected": 1,
          "explanation": "All land cells are interconnected."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "numIslands",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "grid",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "string"
                }
              }
            }
          }
        ]
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
        "description": "Given n non-negative integers representing an elevation map...",
        "constraints": [
          "n == height.length"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "height": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
          },
          "expected": 6,
          "explanation": "The elevation map traps 6 units of water."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "trap",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "height",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  
{
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "companies": ["Amazon", "Microsoft", "Adobe", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
        "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        "constraints": [
          "The number of nodes in the list is the range [0, 5000].",
          "-5000 <= Node.val <= 5000"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "head": [1, 2, 3, 4, 5]
          },
          "expected": [5, 4, 3, 2, 1],
          "explanation": "The nodes are reversed sequentially, making the original tail (5) the new head of the list."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "reverseList",
        "returnType": {
          "kind": "object",
          "className": "ListNode"
        },
        "parameters": [
          {
            "name": "head",
            "type": {
              "kind": "object",
              "className": "ListNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "companies": ["Amazon", "Microsoft", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
        "description": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.",
        "constraints": [
          "The number of nodes in both lists is in the range [0, 50].",
          "-100 <= Node.val <= 100",
          "Both list1 and list2 are sorted in non-decreasing order."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "list1": [1, 2, 4],
            "list2": [1, 3, 4]
          },
          "expected": [1, 1, 2, 3, 4, 4],
          "explanation": "By comparing nodes one by one, we splice them together in ascending order."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "mergeTwoLists",
        "returnType": {
          "kind": "object",
          "className": "ListNode"
        },
        "parameters": [
          {
            "name": "list1",
            "type": {
              "kind": "object",
              "className": "ListNode"
            }
          },
          {
            "name": "list2",
            "type": {
              "kind": "object",
              "className": "ListNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "topic": "Arrays",
    "companies": ["Amazon", "Microsoft", "Goldman Sachs", "Adobe"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        "constraints": [
          "1 <= prices.length <= 10^5",
          "0 <= prices[i] <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "prices": [7, 1, 5, 3, 6, 4]
          },
          "expected": 5,
          "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "maxProfit",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "prices",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "companies": ["Meta", "Amazon", "Microsoft", "Adobe"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/3sum/",
        "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
        "constraints": [
          "3 <= nums.length <= 3000",
          "-10^5 <= nums[i] <= 10^5"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [-1, 0, 1, 2, -1, -4]
          },
          "expected": [[-1, -1, 2], [-1, 0, 1]],
          "explanation": "The distinct triplets that sum up to 0 are [-1, -1, 2] and [-1, 0, 1]."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "threeSum",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
            }
          }
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
{
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "companies": ["Google", "Amazon", "Microsoft", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        "description": "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        "constraints": [
          "1 <= nums.length <= 5000",
          "-10^4 <= nums[i] <= 10^4",
          "All values of nums are unique.",
          "-10^4 <= target <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [4, 5, 6, 7, 0, 1, 2],
            "target": 0
          },
          "expected": 4,
          "explanation": "The value 0 is located at index 4 in the rotated array."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "search",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "target",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topic": "Sorting",
    "companies": ["Google", "Amazon", "Meta", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
        "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        "constraints": [
          "1 <= intervals.length <= 10^4",
          "intervals[i].length == 2",
          "0 <= starti <= endi <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "intervals": [[1, 3], [2, 6], [8, 10], [15, 18]]
          },
          "expected": [[1, 6], [8, 10], [15, 18]],
          "explanation": "Since intervals [1,3] and [2,6] overlap, they are merged into a single continuous interval [1,6]."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "merge",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
            }
          }
        },
        "parameters": [
          {
            "name": "intervals",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "companies": ["Google", "Amazon", "Adobe", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
        "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
        "constraints": [
          "n == height.length",
          "2 <= n <= 10^5",
          "0 <= height[i] <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "height": [1, 8, 6, 2, 5, 4, 8, 3, 7]
          },
          "expected": 49,
          "explanation": "The max water is trapped between the vertical line at index 1 (height 8) and index 8 (height 7). Width is 8 - 1 = 7, effective height is min(8, 7) = 7. Area = 7 * 7 = 49."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "maxArea",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "height",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "topic": "Heaps",
    "companies": ["Meta", "Amazon", "Google", "LinkedIn"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "description": "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
        "constraints": [
          "1 <= k <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [3, 2, 1, 5, 6, 4],
            "k": 2
          },
          "expected": 5,
          "explanation": "When sorted in descending order, the array becomes [6, 5, 4, 3, 2, 1]. The 2nd largest element here is 5."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "findKthLargest",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "k",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "topic": "Binary Search",
    "companies": ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
        "constraints": [
          "nums1.length == m",
          "nums2.length == n",
          "0 <= m, n <= 1000",
          "1 <= m + n <= 2000",
          "-10^6 <= nums1[i], nums2[i] <= 10^6"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums1": [1, 3],
            "nums2": [2]
          },
          "expected": 2.0,
          "explanation": "The merged sorted array is [1, 2, 3] and its middle element (median) is 2."
        },
        {
          "input": {
            "nums1": [1, 2],
            "nums2": [3, 4]
          },
          "expected": 2.5,
          "explanation": "The merged sorted array is [1, 2, 3, 4], and the median is the average of the two middle elements: (2 + 3) / 2 = 2.5."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "findMedianSortedArrays",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums1",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "nums2",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "topic": "Heaps",
    "companies": ["Amazon", "Google", "Meta", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
        "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        "constraints": [
          "k == lists.length",
          "0 <= k <= 10^4",
          "0 <= lists[i].length <= 500",
          "-10^4 <= lists[i][j] <= 10^4",
          "lists[i] is sorted in ascending order."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "lists": [[1, 4, 5], [1, 3, 4], [2, 6]]
          },
          "expected": [1, 1, 2, 3, 4, 4, 5, 6],
          "explanation": "All the individual elements from the k lists are extracted and merged into a single sorted sequential linked list."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "mergeKLists",
        "returnType": {
          "kind": "object",
          "className": "ListNode"
        },
        "parameters": [
          {
            "name": "lists",
            "type": {
              "kind": "array",
              "items": {
                "kind": "object",
                "className": "ListNode"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "companies": ["Amazon", "Apple", "Adobe", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate/",
        "description": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        "constraints": [
          "1 <= nums.length <= 10^5",
          "-10^9 <= nums[i] <= 10^9"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 2, 3, 1]
          },
          "expected": true,
          "explanation": "The element 1 occurs twice in the array, so it contains a duplicate."
        },
        {
          "input": {
            "nums": [1, 2, 3, 4]
          },
          "expected": false,
          "explanation": "All elements in the array are distinct."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "containsDuplicate",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topic": "Strings",
    "companies": ["Amazon", "Goldman Sachs", "Bloomberg", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
        "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        "constraints": [
          "1 <= s.length, t.length <= 5 * 10^4",
          "s and t consist of lowercase English letters."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "s": "anagram",
            "t": "nagaram"
          },
          "expected": true,
          "explanation": "Both strings contain the exact same count for every character: 'a':3, 'n':1, 'g':1, 'r':1, 'm':1."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "isAnagram",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "s",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "t",
            "type": {
              "kind": "string"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "companies": ["Amazon", "Microsoft", "Cisco", "Adobe"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
        "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        "constraints": [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [-2, 1, -3, 4, -1, 2, 1, -5, 4]
          },
          "expected": 6,
          "explanation": "The contiguous subarray [4,-1,2,1] has the largest sum = 6."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "maxSubArray",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topic": "Arrays",
    "companies": ["Amazon", "Meta", "Microsoft", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/product-of-array-except-self/",
        "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.",
        "constraints": [
          "2 <= nums.length <= 10^5",
          "-30 <= nums[i] <= 30",
          "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 2, 3, 4]
          },
          "expected": [24, 12, 8, 6],
          "explanation": "At index 0: 2*3*4=24. At index 1: 1*3*4=12. At index 2: 1*2*4=8. At index 3: 1*2*3=6."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "productExceptSelf",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "number"
          }
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "companies": ["Amazon", "Meta", "Google", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/group-anagrams/",
        "description": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        "constraints": [
          "1 <= strs.length <= 10^4",
          "0 <= strs[i].length <= 100",
          "strs[i] consists of lowercase English letters."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "strs": ["eat", "tea", "tan", "ate", "nat", "bat"]
          },
          "expected": [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
          "explanation": "Words sharing identical sorted character frequencies are grouped inside the same array list."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "groupAnagrams",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "string"
            }
          }
        },
        "parameters": [
          {
            "name": "strs",
            "type": {
              "kind": "array",
              "items": {
                "kind": "string"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "topic": "Heaps",
    "companies": ["Amazon", "Meta", "Google"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
        "description": "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        "constraints": [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4",
          "k is in the range [1, the number of unique elements in the array].",
          "It is guaranteed that the answer is unique."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 1, 1, 2, 2, 3],
            "k": 2
          },
          "expected": [1, 2],
          "explanation": "1 appears 3 times, 2 appears 2 times, and 3 appears 1 time. The 2 most frequent numbers are 1 and 2."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "topKFrequent",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "number"
          }
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "k",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
 {
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "companies": ["Google", "Amazon", "Microsoft", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
        "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        "constraints": [
          "0 <= nums.length <= 10^5",
          "-10^9 <= nums[i] <= 10^9"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [100, 4, 200, 1, 3, 2]
          },
          "expected": 4,
          "explanation": "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "longestConsecutive",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "companies": ["Amazon", "Google", "Adobe"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.",
        "constraints": [
          "2 <= numbers.length <= 3 * 10^4",
          "-1000 <= numbers[i] <= 1000",
          "numbers is sorted in non-decreasing order.",
          "-1000 <= target <= 1000"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "numbers": [2, 7, 11, 15],
            "target": 9
          },
          "expected": [1, 2],
          "explanation": "The sum of 2 and 7 is 9. Since the array is 1-indexed, index1 = 1, index2 = 2. We return [1, 2]."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "twoSum",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "number"
          }
        },
        "parameters": [
          {
            "name": "numbers",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "target",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "companies": ["Google", "Amazon", "Uber"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
        "description": "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
        "constraints": [
          "1 <= s.length <= 10^5",
          "s consists of uppercase English letters.",
          "0 <= k <= s.length"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "s": "ABAB",
            "k": 2
          },
          "expected": 4,
          "explanation": "Replace the two 'A's with 'B's or vice versa. The full string becomes a repeating segment of length 4."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "characterReplacement",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "s",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "k",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "topic": "Sliding Window",
    "companies": ["Meta", "Amazon", "Google", "Airbnb"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
        "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
        "constraints": [
          "m == s.length",
          "n == t.length",
          "1 <= m, n <= 10^5",
          "s and t consist of uppercase and lowercase English letters."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "s": "ADOBECODEBANC",
            "t": "ABC"
          },
          "expected": "BANC",
          "explanation": "The minimum window substring \"BANC\" contains 'B', 'A', and 'C' from string t perfectly."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "minWindow",
        "returnType": {
          "kind": "string"
        },
        "parameters": [
          {
            "name": "s",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "t",
            "type": {
              "kind": "string"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "companies": ["Amazon", "Microsoft", "Goldman Sachs"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
        "constraints": [
          "n == nums.length",
          "1 <= n <= 5000",
          "-5000 <= nums[i] <= 5000",
          "All the integers of nums are unique."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [3, 4, 5, 1, 2]
          },
          "expected": 1,
          "explanation": "The original array was [1,2,3,4,5] rotated 3 times. The smallest value present is 1."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "findMin",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "companies": ["Google", "Amazon", "Meta", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/invert-binary-tree/",
        "description": "Given the root of a binary tree, invert the tree, and return its root.",
        "constraints": [
          "The number of nodes in the tree is in the range [0, 100].",
          "-100 <= Node.val <= 100"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "root": [4, 2, 7, 1, 3, 6, 9]
          },
          "expected": [4, 7, 2, 9, 6, 3, 1],
          "explanation": "The tree is flipped horizontally. Every left child becomes the right child, recursively throughout all nodes."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "invertTree",
        "returnType": {
          "kind": "object",
          "className": "TreeNode"
        },
        "parameters": [
          {
            "name": "root",
            "type": {
              "kind": "object",
              "className": "TreeNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "companies": ["LinkedIn", "Amazon", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        "description": "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        "constraints": [
          "The number of nodes in the tree is in the range [0, 10^4].",
          "-100 <= Node.val <= 100"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "root": [3, 9, 20, null, null, 15, 7]
          },
          "expected": 3,
          "explanation": "The longest deep route goes from 3 -> 20 -> 7 (or 15), which sums to 3 levels/edges."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "maxDepth",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "root",
            "type": {
              "kind": "object",
              "className": "TreeNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "companies": ["Amazon", "Microsoft", "Bloomberg", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
        "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined where left subtree nodes are less than root, right subtree nodes are greater, and no duplicates exist.",
        "constraints": [
          "The number of nodes in the tree is in the range [1, 10^4].",
          "-2^31 <= Node.val <= 2^31 - 1"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "root": [2, 1, 3]
          },
          "expected": true,
          "explanation": "The root value is 2. Left child is 1 (1 < 2) and right child is 3 (3 > 2), keeping the BST property intact."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "isValidBST",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "root",
            "type": {
              "kind": "object",
              "className": "TreeNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topic": "Trees",
    "companies": ["Amazon", "LinkedIn", "Microsoft", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        "description": "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        "constraints": [
          "The number of nodes in the tree is in the range [0, 2000].",
          "-1000 <= Node.val <= 1000"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "root": [3, 9, 20, null, null, 15, 7]
          },
          "expected": [[3], [9, 20], [15, 7]],
          "explanation": "Level 0 has node 3. Level 1 has nodes 9 and 20. Level 2 has nodes 15 and 7."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "levelOrder",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
              }
          }
        },
        "parameters": [
          {
            "name": "root",
            "type": {
              "kind": "object",
              "className": "TreeNode"
            }
          }
        ]
      }
    }
  },
 {
    "title": "Clone Graph",
    "difficulty": "Medium",
    "topic": "Graphs",
    "companies": ["Meta", "Amazon", "Google"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/clone-graph/",
        "description": "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
        "constraints": [
          "The number of nodes in the graph is between 0 and 100.",
          "1 <= Node.val <= 100",
          "Node.val is unique for each node."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "adjList": [[2, 4], [1, 3], [2, 4], [1, 3]]
          },
          "expected": [[2, 4], [1, 3], [2, 4], [1, 3]],
          "explanation": "A brand new independent instance duplication structure of all interconnected node references is constructed."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "cloneGraph",
        "returnType": {
          "kind": "object",
          "className": "Node"
        },
        "parameters": [
          {
            "name": "node",
            "type": {
              "kind": "object",
              "className": "Node"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Course Schedule",
    "difficulty": "Medium",
    "topic": "Graphs",
    "companies": ["Google", "Amazon", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
        "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
        "constraints": [
          "1 <= numCourses <= 2000",
          "0 <= prerequisites.length <= 5000",
          "prerequisites[i].length == 2",
          "All the pairs prerequisites[i] are unique."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "numCourses": 2,
            "prerequisites": [[1, 0]]
          },
          "expected": true,
          "explanation": "To take course 1 you should have finished course 0. So it is completely possible to sequence them."
        },
        {
          "input": {
            "numCourses": 2,
            "prerequisites": [[1, 0], [0, 1]]
          },
          "expected": false,
          "explanation": "To take course 1 you must complete 0, and to take 0 you must complete 1. This forms a cyclic dependency block."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "canFinish",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "numCourses",
            "type": {
              "kind": "number"
            }
          },
          {
            "name": "prerequisites",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Coin Change",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "companies": ["Amazon", "Microsoft", "Goldman Sachs"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
        "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        "constraints": [
          "1 <= coins.length <= 12",
          "1 <= coins[i] <= 2^31 - 1",
          "0 <= amount <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "coins": [1, 2, 5],
            "amount": 11
          },
          "expected": 3,
          "explanation": "11 can be formed optimally using 3 minimal coins: 5 + 5 + 1 = 11."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "coinChange",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "coins",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Subsets",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "companies": ["Meta", "Amazon", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/subsets/",
        "description": "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
        "constraints": [
          "1 <= nums.length <= 10",
          "-10 <= nums[i] <= 10",
          "All the numbers of nums are unique."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 2, 3]
          },
          "expected": [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
          "explanation": "All variations of item selections including empty set combinations are compiled."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "subsets",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
            }
          }
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Word Search",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "companies": ["Amazon", "Microsoft", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/word-search/",
        "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
        "constraints": [
          "m == board.length",
          "n = board[i].length",
          "1 <= m, n <= 6",
          "1 <= word.length <= 15",
          "board and word consist of only lowercase and uppercase English letters."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "board": [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
            "word": "ABCCED"
          },
          "expected": true,
          "explanation": "The path tracking letters sequence 'A' -> 'B' -> 'C' -> 'C' -> 'E' -> 'D' exists continuously across neighboring cells."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "exist",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "board",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "string"
                }
              }
            }
          },
          {
            "name": "word",
            "type": {
              "kind": "string"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "companies": ["Meta", "Amazon", "Google", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
        "description": "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.",
        "constraints": [
          "1 <= nums.length <= 2 * 10^4",
          "-1000 <= nums[i] <= 1000",
          "-10^7 <= k <= 10^7"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 1, 1],
            "k": 2
          },
          "expected": 2,
          "explanation": "The subarrays [1,1] from index 0 to 1, and [1,1] from index 1 to 2 both sum up to k = 2."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "subarraySum",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          },
          {
            "name": "k",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Encode and Decode Strings",
    "difficulty": "Medium",
    "topic": "Strings",
    "companies": ["Meta", "Amazon", "Google", "LinkedIn"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/encode-and-decode-strings/",
        "description": "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
        "constraints": [
          "1 <= strs.length <= 200",
          "0 <= strs[i].length <= 200",
          "strs[i] contains any possible ASCII characters."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "strs": ["lint", "code", "love", "you"]
          },
          "expected": ["lint", "code", "love", "you"],
          "explanation": "The strings can be encoded using a length-based delimiter like '4#lint4#code' so that during decoding, any special characters inside the text don't break the original split."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "encodeAndDecode",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "string"
          }
        },
        "parameters": [
          {
            "name": "strs",
            "type": {
              "kind": "array",
              "items": {
                "kind": "string"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "companies": ["Amazon", "Microsoft", "Meta", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
        "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle if there is some node in the list that can be reached again by continuously following the next pointer.",
        "constraints": [
          "The number of nodes in the list is in the range [0, 10^4].",
          "-10^5 <= Node.val <= 10^5"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "head": [3, 2, 0, -4],
            "pos": 1
          },
          "expected": true,
          "explanation": "There is a cycle in the linked list where the tail connects to the 1st node (0-indexed)."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "hasCycle",
        "returnType": {
          "kind": "boolean"
        },
        "parameters": [
          {
            "name": "head",
            "type": {
              "kind": "object",
              "className": "ListNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "topic": "Stack",
    "companies": ["Amazon", "Meta", "Google", "Netflix"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/daily-temperatures/",
        "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
        "constraints": [
          "1 <= temperatures.length <= 10^5",
          "30 <= temperatures[i] <= 100"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "temperatures": [73, 74, 75, 71, 69, 72, 76, 73]
          },
          "expected": [1, 1, 4, 2, 1, 1, 0, 0],
          "explanation": "For day 0 (73), the next warmer day is day 1 (74), so wait 1 day. For day 2 (75), the next warmer day is day 6 (76), so wait 4 days."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "dailyTemperatures",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "number"
          }
        },
        "parameters": [
          {
            "name": "temperatures",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "topic": "Design",
    "companies": ["Google", "Amazon", "Microsoft", "Twitter"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
        "description": "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith methods.",
        "constraints": [
          "1 <= word.length, prefix.length <= 2000",
          "word and prefix consist only of lowercase English letters.",
          "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "commands": ["Trie", "insert", "search", "startsWith"],
            "arguments": [[], ["apple"], ["apple"], ["app"]]
          },
          "expected": [null, null, true, true],
          "explanation": "After inserting 'apple', searching for 'apple' returns true. Checking if any word starts with 'app' also returns true because 'apple' exists."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "Trie",
        "returnType": {
          "kind": "void"
        },
        "parameters": []
      }
    }
  },
  {
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "topic": "Heaps",
    "companies": ["Amazon", "Meta", "Google", "Uber"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
        "description": "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0). The distance between two points on the X-Y plane is the Euclidean distance.",
        "constraints": [
          "1 <= k <= points.length <= 10^4",
          "-10^4 <= xi, yi <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "points": [[1, 3], [-2, 2]],
            "k": 1
          },
          "expected": [[-2, 2]],
          "explanation": "The distance from (1, 3) to origin is sqrt(10). The distance from (-2, 2) to origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "kClosest",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
            }
          }
        },
        "parameters": [
          {
            "name": "points",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          },
          {
            "name": "k",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topic": "Sorting",
    "companies": ["Google", "Amazon", "Meta", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
        "description": "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
        "constraints": [
          "1 <= intervals.length <= 10^5",
          "intervals[i].length == 2",
          "-5 * 10^4 <= starti < endi <= 5 * 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "intervals": [[1, 2], [2, 3], [3, 4], [1, 3]]
          },
          "expected": 1,
          "explanation": "[1,3] can be removed and the rest of the intervals [[1,2],[2,3],[3,4]] become non-overlapping."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "eraseOverlapIntervals",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "intervals",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "topic": "Graphs",
    "companies": ["Google", "Amazon", "Meta"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
        "description": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Water can flow from a cell to neighbor cells if the neighbor's height is less than or equal to the current cell's height. Return a list of grid coordinates where rain water can flow to both oceans.",
        "constraints": [
          "m == heights.length",
          "n == heights[r].length",
          "1 <= m, n <= 200",
          "0 <= heights[r][c] <= 10^5"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "heights": [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]
          },
          "expected": [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
          "explanation": "Water from these specific cells can touch the top/left edges (Pacific) and bottom/right edges (Atlantic) through decreasing or equal height paths."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "pacificAtlantic",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
            }
          }
        },
        "parameters": [
          {
            "name": "heights",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "topic": "Graphs",
    "companies": ["Amazon", "Microsoft", "Google", "Uber"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
        "description": "You are given an m x n grid where each cell can have values: 0 (empty), 1 (fresh orange), or 2 (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum minutes that must elapse until no cell has a fresh orange. If impossible, return -1.",
        "constraints": [
          "m == grid.length",
          "n == grid[i].length",
          "1 <= m, n <= 10",
          "grid[i][j] is 0, 1, or 2."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "grid": [[2, 1, 1], [1, 1, 0], [0, 1, 1]]
          },
          "expected": 4,
          "explanation": "Using BFS level-order traversal, the rot spreads from the top-left cell corner across adjacent fresh oranges sequentially in 4 minutes."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "orangesRotting",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "grid",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topic": "Heaps",
    "companies": ["Meta", "Amazon", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
        "description": "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks.",
        "constraints": [
          "1 <= tasks.length <= 10^4",
          "tasks[i] is upper-case English letter.",
          "0 <= n <= 100"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "tasks": ["A", "A", "A", "B", "B", "B"],
            "n": 2
          },
          "expected": 8,
          "explanation": "A possible execution sequence is A -> B -> idle -> A -> B -> idle -> A -> B. Total time units = 8."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "leastInterval",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "tasks",
            "type": {
              "kind": "array",
              "items": {
                "kind": "string"
              }
            }
          },
          {
            "name": "n",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topic": "Arrays",
    "companies": ["Microsoft", "Amazon", "Google", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
        "description": "Given an m x n matrix, return all elements of the matrix in spiral order clockwise.",
        "constraints": [
          "m == matrix.length",
          "n == matrix[i].length",
          "1 <= m, n <= 10",
          "-100 <= matrix[i][j] <= 100"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
          },
          "expected": [1, 2, 3, 6, 9, 8, 7, 4, 5],
          "explanation": "Traverse right across the top row, down the rightmost column, left across the bottom row, and up the left column iteratively inwards."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "spiralOrder",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "number"
          }
        },
        "parameters": [
          {
            "name": "matrix",
            "type": {
              "kind": "array",
              "items": {
                "kind": "array",
                "items": {
                  "kind": "number"
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Subsets II",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "companies": ["Meta", "Amazon", "Google"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/subsets-ii/",
        "description": "Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
        "constraints": [
          "1 <= nums.length <= 10",
          "-10 <= nums[i] <= 10"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 2, 2]
          },
          "expected": [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
          "explanation": "By sorting the array first, duplicates can be skipped during backtracking choices to avoid identical subsets."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "subsetsWithDup",
        "returnType": {
          "kind": "array",
          "items": {
            "kind": "array",
            "items": {
              "kind": "number"
            }
          }
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "House Robber",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "companies": ["Google", "Amazon", "Microsoft", "Cisco"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
        "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.",
        "constraints": [
          "1 <= nums.length <= 100",
          "0 <= nums[i] <= 400"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "nums": [1, 2, 3, 1]
          },
          "expected": 4,
          "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "rob",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "nums",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "companies": ["Amazon", "Google", "Meta", "Microsoft"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
        "description": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
        "constraints": [
          "1 <= text1.length, text2.length <= 1000",
          "text1 and text2 consist of lowercase English characters only."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "text1": "abcde",
            "text2": "ace"
          },
          "expected": 3,
          "explanation": "The longest common subsequence is 'ace' and its length is 3."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "longestCommonSubsequence",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "text1",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "text2",
            "type": {
              "kind": "string"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "companies": ["Apple", "Microsoft", "Amazon"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
        "description": "Given a positive integer n, write a function that returns the number of set bits (1s) it has (also known as the Hamming weight).",
        "constraints": [
          "n must be a valid 32-bit unsigned integer binary string representation."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "n": 11
          },
          "expected": 3,
          "explanation": "The input integer 11 has binary representation 00000000000000000000000000001011, which contains a total of three '1' bits."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "hammingWeight",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "n",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "companies": ["Meta", "Amazon", "Hulu"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/sum-of-two-integers/",
        "description": "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
        "constraints": [
          "-1000 <= a, b <= 1000"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "a": 1,
            "b": 2
          },
          "expected": 3,
          "explanation": "Bitwise XOR simulates addition without carry, and bitwise AND with left shift simulates calculating the carry values to perform addition natively."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "getSum",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "a",
            "type": {
              "kind": "number"
            }
          },
          {
            "name": "b",
            "type": {
              "kind": "number"
            }
          }
        ]
      }
    }
  },
 {
    "title": "Word Ladder",
    "difficulty": "Hard",
    "topic": "Graphs",
    "companies": ["Amazon", "Google", "Microsoft", "Snapchat"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
        "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words where every adjacent pair of words differs by a single letter. Return the number of words in the shortest transformation sequence, or 0 if no sequence exists.",
        "constraints": [
          "1 <= beginWord.length <= 10",
          "endWord.length == beginWord.length",
          "1 <= wordList.length <= 5000",
          "wordList[i].length == beginWord.length",
          "All words in wordList are unique."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "beginWord": "hit",
            "endWord": "cog",
            "wordList": ["hot", "dot", "dog", "lot", "log", "cog"]
          },
          "expected": 5,
          "explanation": "One shortest transformation sequence is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\", which is 5 words long."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "ladderLength",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "beginWord",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "endWord",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "wordList",
            "type": {
              "kind": "array",
              "items": {
                "kind": "string"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topic": "Stack",
    "companies": ["Amazon", "Google", "Meta", "Apple"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        "description": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, find the area of the largest rectangle in the histogram.",
        "constraints": [
          "1 <= heights.length <= 10^5",
          "0 <= heights[i] <= 10^4"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "heights": [2, 1, 5, 6, 2, 3]
          },
          "expected": 10,
          "explanation": "The largest rectangle is formed by bars 5 and 6 with an effective maximum height of 5 and a total width of 2 (5 * 2 = 10)."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "largestRectangleArea",
        "returnType": {
          "kind": "number"
        },
        "parameters": [
          {
            "name": "heights",
            "type": {
              "kind": "array",
              "items": {
                "kind": "number"
              }
            }
          }
        ]
      }
    }
  },
  {
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "topic": "Trees",
    "companies": ["Amazon", "Google", "Microsoft", "Meta", "LinkedIn"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored or transmitted. Design an algorithm to serialize and deserialize a binary tree.",
        "constraints": [
          "The number of nodes in the tree is in the range [0, 10^4].",
          "-1000 <= Node.val <= 1000"
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "root": [1, 2, 3, null, null, 4, 5]
          },
          "expected": [1, 2, 3, null, null, 4, 5],
          "explanation": "The tree structure is flattened into a string mapping via pre-order traversal or BFS traversal and parsed cleanly back into original object references."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "serializeAndDeserialize",
        "returnType": {
          "kind": "object",
          "className": "TreeNode"
        },
        "parameters": [
          {
            "name": "root",
            "type": {
              "kind": "object",
              "className": "TreeNode"
            }
          }
        ]
      }
    }
  },
  {
    "title": "Minimum Window Subsequence",
    "difficulty": "Hard",
    "topic": "Sliding Window",
    "companies": ["Google", "Amazon", "eBay"],
    "metaData": {
      "create": {
        "leetcodeUrl": "https://leetcode.com/problems/minimum-window-subsequence/",
        "description": "Given strings s1 and s2, return the minimum contiguous substring part of s1 such that s2 is a subsequence of the substring. If there is no such window, return the empty string \"\".",
        "constraints": [
          "1 <= s1.length <= 2 * 10^4",
          "1 <= s2.length <= 100",
          "s1 and s2 consist of lowercase English letters."
        ]
      }
    },
    "testCases": {
      "create": [
        {
          "input": {
            "s1": "abcdebdde",
            "s2": "bde"
          },
          "expected": "bcde",
          "explanation": "\"bcde\" occurs first and contains all characters of s2 sequentially inside s1, which is shorter than \"bdde\" appearing later."
        }
      ]
    },
    "signature": {
      "create": {
        "functionName": "minWindow",
        "returnType": {
          "kind": "string"
        },
        "parameters": [
          {
            "name": "s1",
            "type": {
              "kind": "string"
            }
          },
          {
            "name": "s2",
            "type": {
              "kind": "string"
            }
          }
        ]
      }
    }
  }
 
]
const seedDb = async (initData: SeedProblem[]) => {
  try {
    await prisma.problem.deleteMany();

    await Promise.all(
      initData.map((problem) =>
        prisma.problem.create({
          data: {
            ...problem,
            slug : slugify(problem.title,{
                lower:true,
                strict:true
            })
          },
        })
      )
    );

    console.log("Seeding complete");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDb(initData)
  .then(() => {
    console.log("Done");
  })
  .catch(console.error);
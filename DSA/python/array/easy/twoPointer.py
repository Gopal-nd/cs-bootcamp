class Solution:
    # Function to find union of two sorted arrays using two pointers
    def findUnion(self, arr1, arr2, n, m):
        union = []
        i,j = 0,0
        while i<n and j<m:
            if arr1[i]<arr2[j]:
                if not union or union[-1] !=arr1[i]:
                    union.append(arr1[i])
                i+=1
            elif arr2[j] < arr1[i]:
                if not union or union[-1]!= arr2[j]:
                    union.append(arr2[j])
                j+=1
                i+=1
        while i<n:
            if not union or union[-1] != arr1[i]:
                union.append(arr1[i])
            i+=1
        while j<m:
            if not union or union[-1] != arr2[j]:
                union.append(arr2[j])
            j+=1
        return union


# Driver code
if __name__ == "__main__":
    arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    arr2 = [2, 3, 4, 4, 5, 11, 12]
    n, m = len(arr1), len(arr2)

    obj = Solution()
    result = obj.findUnion(arr1, arr2, n, m)
    print("Union of arr1 and arr2 is:", *result)


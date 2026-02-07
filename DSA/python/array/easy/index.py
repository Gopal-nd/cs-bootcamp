from warnings import resetwarnings


def secondLargest(arr,n):
    sec_larg = float('-inf')
    larg = float('-inf')

    for i in range(len(arr)):
        if arr[i] > larg:
            sec_larg = larg
            larg = arr[i]
        elif arr[i] > sec_larg and arr[i] != larg:
            sec_larg = arr[i]
    return sec_larg

def secondSmallest(arr,n):
    sec = float('inf')
    large = float('inf')

    for i in range(n):
        if arr[i] <large:
            sec = large
            large = arr[i]
        elif arr[i]< sec and arr[i] != large:
            sec = arr[i]
    return sec

def removeDuplicates(arr):
    un = []
    freq = {}
    for i in range(len(arr)):
        freq[arr[i]] = freq.get(arr[i],0)+1
    for key,val in freq.items():
        un.append(key)

    return un
def rotate(arr,k,dir):
    def reverse(nums,start,end):
        while start < end:
            nums[start],nums[end] =nums[end], nums[start] 
            start +=1
            end -=1

    n =len(arr)
    if n ==0 or k ==0:
        return arr 
    if dir =='right':
        reverse(arr,0,n-1)
        reverse(arr,0,k-1)
        reverse(arr,k,n-1)
    elif dir == 'left':
        reverse(arr,0,k-1)
        reverse(arr,0,n-1)
        reverse(arr,k,n-1)
    return arr
def findMissingNumber(arr):
    n = len(arr)
    x1 = 0
    x2 = 0

    for i in range(n):
        x1^=arr[i]
    for i in range(1,n+1):
        x2^=i
    return x1 ^ x2
def logSubArr(arr,v):
    i = 0
    m = 0
    s = 0
    for k in range(len(arr)):
        s +=arr[k]
        while s >v:
            s-=arr[k]
            i+=1 
        if s == v:
            m = max(m,k-i+1)
    return m

if __name__ == "__main__":
    arr = [1, 2, 4, 7, 7, 5,2,1]  # Array of elements
    n = len(arr)  # Size of the array

    # Find the second smallest and second largest elements
    sS = secondSmallest(arr, n)
    sL = secondLargest(arr, n)
    ar = removeDuplicates(arr)
    print(ar)

    # Output the results
    print(f"Second smallest is {sS}")
    print(f"Second largest is {sL}")

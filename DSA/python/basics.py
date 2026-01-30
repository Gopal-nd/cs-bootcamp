n,i = list(map(int,input().split()))
def name(n,i):
    while i!=0:
        n ,i =i, n % i
    return n
        



ans = name(n,i)
print(ans)

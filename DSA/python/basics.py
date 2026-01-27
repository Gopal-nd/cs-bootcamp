n = int(input())
 
for i in range(1,2*n):
    dist = 0
    if i <= n:
        dist = i
    else:
        dist = 2*n -i
 
    for j in range(n-dist+1):
        print("*",end='')
    for j in range(dist):
        print('  ',end='')
    for j in range(n-dist+1):
        print("*",end='')
    print('')

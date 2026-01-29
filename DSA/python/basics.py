n = int(input())
for i in range(1,2*n):
    if i<=n:
        dist = i
    else:
        dist = 2*n-i
    for j in range(dist-1):
        print(' ',end='')
    for j in range(dist):
        if j==0 or j == dist -1:
                if j == dist - 1:
                    print(">", end='')
                else:
                    print("> ", end='')     
        else:
            for i in range(2*dist-1):
                print(" ",end='')
    print('')
    


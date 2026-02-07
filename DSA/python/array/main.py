n, x = map(int, input().split())
A = list(map(int, input().split()))

ans = 0

for k in range(2, n - 1):
    right_freq = {}

    for l in range(k + 1, n):
        val = 3 * A[k] - 4 * A[l]
        right_freq[val] = right_freq.get(val, 0) + 1

    for i in range(k):
        for j in range(i + 1, k):
            left = A[i] - 2 * A[j]
            need = x - left
            ans += right_freq.get(need, 0)

print(ans)


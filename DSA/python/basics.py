#
#
# import re
# from string import templatelib
# from types import prepare_class
#
#
# class Node:
#     def __init__(self,data,next=None) -> None:
#         self.data = data
#         self.next = next
#
# root = Node(10)
# root.next = Node(11)
# root.next.next = Node(12)
# root.next.next.next = Node(13)
#
#
def printLinkedList(root):
    temp = root 
    while temp != None:
        print(temp.data,end='->')
        temp = temp.next
    print(None)
# printLinkedList(root)
#
# def addAtStart(root,val):
#     newNode = Node(val)
#     newNode.next = root
#     return newNode
#
# def addAtEnd(root,val):
#     temp = root
#     while temp.next != None:
#         temp = temp.next
#     temp.next = Node(val)
#     return root
#
def lllenth(root):
    count = 0
    while root != None:
        root = root.next
        count +=1 
    return count
#
# def AddInIthIndex(root,i,val):
#     temp = root
#
#     while temp!=None and i>2: # 0 fro the after next element
#         temp = temp.next
#         i = i -1
#     if temp == None:
#         print('not possible')
#         return root
#     if temp.next == None:
#         temp.next = Node(val)
#         return root
#     if temp.next != None:
#         newNode = Node(val)
#         newNode.next = temp.next
#         temp.next = newNode
#         return root
#
#     return root
#
# def deletefirst(root):
#     temp = root 
#     temp = temp.next
#     return temp
# def deleteEnd(root):
#     temp = root
#     while temp.next.next != None:
#         temp = temp.next
#     temp.next = None
#     return root
# def deleteIndex(root,i):
#     temp = root
#     if temp == None:
#         return root
#     if i == 0:
#         return root.next
#     for i in range(i-1):
#         if temp.next == None:
#             return root
#         temp = temp.next
#     if temp.next:
#         temp.next = temp.next.next
#     return root
#
# printLinkedList(deleteIndex(root,1))
# printLinkedList(deletefirst(root))
# printLinkedList(deleteEnd(root))
#
# def findINLL(root,val):
#     i = 0
#     temp =  root
#     while temp!=None:
#         if temp.data == val:
#             return  i
#         temp = temp.next
#         i = i+1
#     return 0
#
#
# root = addAtStart(root,9)
# root = addAtEnd(root,99)
# print(lllenth(root))
# printLinkedList(root)
# root = AddInIthIndex(root,5,111)
# printLinkedList(root)
# print(findINLL(root,99))
# printLinkedList(root)
#
# def deleteElement(root,val):
#     temp = root
#     if temp == None:
#         return root
#     while temp!=None and temp.next.data != val:
#         temp = temp.next
#     if temp.next:
#         temp.next = temp.next.next
#     return root
#
# printLinkedList(deleteElement(root,12))
#
#


import re
from typing import Counter, NoDefault, no_type_check_decorator


class Node:
    def __init__(self,data,next=None):
        self.data = data
        self.next = next

head = Node(10)
head.next = Node(11)
head.next.next = Node(12)
head.next.next.next = Node(13)
head.next.next.next.next = Node(14)
# head.next.next.next.next.next = Node(15)


def findTheMin(head):
    slow = head
    fast = head
    while fast!=None and fast.next != None:
        slow = slow.next
        fast = fast.next.next
    return slow.data

def ReverseLL(head):
    cur = head
    prev = None

    while cur!=None:
        next = cur.next
        cur.next = prev
        prev = cur
        cur = next

    return prev

def FindLoop(head):
    slow = head
    fast = head

    while fast!=None and fast.next !=None:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True
    return False

def Rev(head):
    curr = head
    prev = None

    while curr:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next

    return prev

def createLL(arr):
    head = Node(arr[0]) 
    cur = head
    for i in range(1,len(arr)):
       cur.next = Node(arr[i]) 
       cur = cur.next 
        
    return head

print(findTheMin(head))
root = ReverseLL(head)
printLinkedList(root)
print(FindLoop(root))


h1 = createLL([1,2,3,2,1])
h2 = createLL([7,6,5,4,3,2,1])
printLinkedList(h1)
def palindrom(h1):
    h2 = ReverseLL(h1)

    while h1 != None and h2 != None:
        if h1.data !=h2.data:
            return False
        h1 = h1.next
        h2 = h2.next
    return True
print(palindrom(h1))


def interSection(h1,h2):
    def l(head):
          c = 0
          while head:
            c+=1 
            head = head.next
          return c 

    hl1 = l(h1)
    hl2 = l(h2)

    a, b = h1, h2 
    if hl1 > hl2:
        for _ in range(hl1-hl2):
            a = a.next
    else:
        for _ in range(hl2 - hl1):
            b = b.next

    while a and b:
        if a == b:
            return a
        a= a.next
        b = b.next
    return None

def rotate(head,k):
    if head == None or head.next == None or k ==0:
        return head
    
    tail = head
    lenth = 1 
    while tail.next:
        tail = tail.next
        lenth +=1 

    k = k % lenth

    if k ==0:
        return head
    tail.next = head
    steps = lenth - k 

    n_tail = head
    for _ in range(steps -1):
        n_tail = n_tail.next
    n_head = n_tail.next
    n_tail.next = None
    return n_head
    

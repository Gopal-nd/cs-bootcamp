# 1-> 2-> 3 ->4 ->5
# let k = 2
# ans => 3->4->5->1->2

# make it circular ll and start head from n-k 
# make the tail -> None


import re
from string import templatelib
from typing import no_type_check


class Node:
    def __init__(self,data,next = None):
        self.data = data
        self.next = next


def createLL(arr):
    head = Node(arr[0])
    temp = head
    for i in range(1,len(arr)):
        temp.next = Node(arr[i])
        temp= temp.next
    return head

def printLL(head):
    while head:
        print(head.data,end='->')
        head = head.next 
    print('None')

def lll(root):
    temp = head 
    c = 0
    while temp:
        temp = temp.next
        c+=1
    return c


head = createLL([1,2,3,4,5,6])
printLL(head)

def rotatell(head,k):
    if head == None or head.next == None or k == 0:
        return head

    # length of ll 
    l = lll(head)
    k = k%l
    if k == 0:
        return head
    
    # find tail 
    tail = head 
    while tail.next:
        tail = tail.next 
    
    new_tail = head
    for i in range(l-k-1):
        new_tail = new_tail.next 

    new_head = new_tail.next
    new_tail.next = None
    tail.next = head

    return new_head


printLL(rotatell(head,3))
    


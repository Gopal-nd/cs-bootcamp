


class Node:
    def __init__(self,data,random,next = None):
        self.data = data
        self.next = next
        self.random = random


def printLL(head):
    while head:
        print(head.data,head.random,end='->')
        head = head.next 
    print('None')

head = Node(10,10)
head.next = Node(11,11)
head.next.next = Node(12,12)
head.next.next.next = Node(13,13)

printLL(head)
def clone(head):
    start  = Node(1,1)
    newLL = start

    while head:
        newLL = Node(head.data,head.random)
        newLL = newLL.next
        head = head.next
    return start.next

printLL(clone(head))

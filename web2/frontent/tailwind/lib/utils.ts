import React from 'react'
import { type ClassValue ,clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...input:ClassValue[]) => {
return twMerge(clsx(input))
}

export default cn
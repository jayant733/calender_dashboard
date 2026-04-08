import { type PropsWithChildren } from 'react'
import { motion } from 'motion/react'

export function PageTransition({ children }: PropsWithChildren) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

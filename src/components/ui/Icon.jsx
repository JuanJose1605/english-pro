import {
  ClipboardList,
  GraduationCap,
  MessagesSquare,
  BadgeCheck,
  Video,
  User,
  Users,
  Briefcase,
  Award,
  Search,
  Route,
  Headphones,
  Trophy,
  Circle,
} from 'lucide-react'

/**
 * Maps the string icon names used in the data files to specific Lucide
 * components. Importing icons explicitly (instead of `import *`) keeps the
 * bundle tree-shakeable and small.
 */
const map = {
  ClipboardList,
  GraduationCap,
  MessagesSquare,
  BadgeCheck,
  Video,
  User,
  Users,
  Briefcase,
  Award,
  Search,
  Route,
  Headphones,
  Trophy,
}

export default function Icon({ name, ...props }) {
  const Cmp = map[name] || Circle
  return <Cmp aria-hidden="true" {...props} />
}

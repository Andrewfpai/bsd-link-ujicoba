import Algorithm from '../components/makeRoute'
import { motion, useScroll, useSpring } from "framer-motion";

function Search() {

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

    return(
      <div className="overflow-y-hidden scrollbar-none">
        <motion.div className="progress-bar" style={{ scaleX }} />
        <Algorithm/>
      </div>
  )
}

export default Search
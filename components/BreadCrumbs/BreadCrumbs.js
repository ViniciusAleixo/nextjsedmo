import styles from "../BreadCrumbs/BreadCrumbs.module.css";
import Breadcrumbs from "nextjs-breadcrumbs";

export const BreadCrumbs = () => {
    return (
        <Breadcrumbs containerClassName={styles._2jvtI}
        rootLabel="All Products" 
      replaceCharacterList={[{ from: '%20', to: ' ' },
                             { from: '%2C', to: ' ' },
                             { from: '%2F', to: ' ' },
                             { from: '%26', to: ' ' },
                             { from: '%252F', to: ' ' },
                             { from: '%29%29', to: ' ' },
                             { from: '%2520', to: ' ' },
                             { from: '%28', to: ' ' },
                             { from: '%2523', to: ' ' },
                             { from: '%7C', to: ' ' },
                             { from: '%257C', to: ' ' },
                             { from: '.', to: ' ' }]}
      
    />
    )
}
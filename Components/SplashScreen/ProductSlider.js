// import { View, Text, Image,  StyleSheet, Dimensions,
// } from "react-native";
// import React, { FC, useMemo } from "react";
// import AutoScroll from "@homielab/react-native-auto-scroll";
// import { productData } from "./data";

// const { width: screenWidth } = Dimensions.get('window');

// const ProductSlider = () => {
//   const rows = useMemo(() => {
//     const result = [];
//     for (let i = 0; i < productData.lenght; i += 4) {
//       result.push(productData.slice(i, i + 4));
//     }
//     return result
//   }, []);
//   return (
//     <View pointerEvents="none">
//       <AutoScroll>
//         <View>
//           {rows?.map((row, rowIndex) => {
//             return <MemorizedRow key={rowIndex} row={row} rowIndex={rowIndex} />;
//           })}
//         </View>
//       </AutoScroll>
//     </View>
//   );
// };

// const Row: FC <{row:typeof productData ; rowIndex: number}>=({row, rowIndex})=>{
//     return <View>
//         {row.map((image,imageIndex)=>{
//             return(<View style={styles.itemContainer}>
//                 <Image source={image} style={styles.image}/>
//             </View>)
//         })}
//     </View>
// }

// const MemorizedRow = React.memo(Row)

// const styles = StyleSheet.create({
//     itemContainer:{
//         marginBottom:12,
//         marginHorizontal:10,
//         backgroundColor:"#e9f7f8" ,
//         justifyContent:"center",
//         borderRadius:25,
//         alignItems:"center",
//         width : screenWidth * 0.26,
//         height : screenWidth * 0.26

//     },
//     image:{
//         width:"100%",
//         height:"100%",
//         resizeMode :"contain"
//     }
// })

// export default ProductSlider;

import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useMemo } from "react";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { productData } from "./data";

const { width: screenWidth } = Dimensions.get("window");

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < productData.length; i += 5) {
      result.push(productData.slice(i, i + 5));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0}
        duration={25000}
      >
        <View style={styles.gridContainer}>
          {rows.map((row, rowIndex) => {
            return (
              <MemorizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
            );
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row = ({ row, rowIndex }) => {
  return (
    <View style={[styles.row]}>
      {row.map((image, imageIndex) => {
        const horizontalIndex = rowIndex % 2 === 0 ? -18 : 18;

        return (
          <View
            style={[
              styles.itemContainer,
              { transform: [{ translateX: horizontalIndex }] },
            ]}
            key={imageIndex}
          >
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemorizedRow = React.memo(Row);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    backgroundColor: "#e9f7f8",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  autoScroll: {
    position: "absolute",
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: "center",
    overflow: "visible",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default ProductSlider;

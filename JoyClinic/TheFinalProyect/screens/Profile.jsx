import {View, Text, Image, TouchableOpacity, useWindowDimensions, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { photos } from "../constants/data";
  
  const PhotosRoutes = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={photos}
        numColumns={3}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              aspectRatio: 1,
              margin: 3,
            }}
          >
            <Image
              key={index}
              source={item}
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
            />
          </View>
        )}
      />
    </View>
  );
  
  const LikesRoutes = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "blue",
      }}
    />
  );
  
  const renderScene = SceneMap({
    first: PhotosRoutes,
    second: LikesRoutes,
  });
  
  const Profile = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
  
    const [routes] = useState([
      { key: "first", title: "Galería" },
      { key: "second", title: "Guardados" },
    ]);
  
    const renderTabBar = (props) => (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: COLORS.primary,
        }}
        style={{
          backgroundColor: COLORS.white,
          height: 44,
        }}
        renderLabel={({ focused, route }) => (
          <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
            {route.title}
          </Text>
        )}
      />
    );
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={images.cover}
            resizeMode="cover"
            style={{
              height: 60,
              width: "100%",
            }}
          />
        </View>
  
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={images.profile}
            resizeMode="contain"
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: COLORS.primary,
              borderWidth: 2,
              marginTop: -90,
            }}
          />
  
          <Text
            style={{
              
              color: COLORS.primary,
              marginVertical: 8,
            }}
          >
            Alejandro Gutiérrez
          </Text>
          <Text
            style={{
              color: COLORS.black,
             
            }}
          >
            Desarrollador Multimedia
          </Text>
  
          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text
              style={{
                
                marginLeft: 4,
              }}
            >
              Barcelona, España
            </Text>
          </View>
  
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  
                  color: COLORS.primary,
                }}
              >
                122
              </Text>
              <Text
                style={{
                  
                  color: COLORS.primary,
                }}
              >
                Followers
              </Text>
            </View>
  
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                
                  color: COLORS.primary,
                }}
              >
                67
              </Text>
              <Text
                style={{
                 
                  color: COLORS.primary,
                }}
              >
                Followings
              </Text>
            </View>
  
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: SIZES.padding,
              }}
            >
            </View>
          </View>
  
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 124,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                borderRadius: 9,
                marginHorizontal: SIZES.padding -10,
              }}
            >
              <Text
                style={{
                 
                  color: COLORS.white,
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                width: 124,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                marginHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                
                  color: COLORS.white,
                }}
              >
                Add Friend
              </Text>
              
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 124,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                marginHorizontal: SIZES.padding -10,
              }}
            >
              <Text
                style={{
                
                  color: COLORS.white,
                }}
              >
                Calendary
              </Text>
              
            </TouchableOpacity>
            
          </View>
        </View>
  
        <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default Profile;
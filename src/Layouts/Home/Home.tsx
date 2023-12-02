  import React, { useEffect, useState } from "react";
  import { getCurrentLocation } from "../../Common/Hooks/LocationHook";
  import Banner from "../../Components/App/Banner";
  import FilterBar from "../../Components/App/FilterBarHome";
  import { HomeFilter } from "../../Models/HomeFilter";
  import "./ContentDisplayer.scss";
  import LeftContent from "./ContentDisplayer/LeftContent";
  import RightContent from "./ContentDisplayer/RightContent";

  interface IProps{
  }
  function Home( props: IProps ): React.JSX.Element{
    //configuration
    //hooks
    ///variable-hooks
    const [ filter, setFilter ] = useState<HomeFilter>();
    ///handle-hooks
    // useEffect( () => {

    //   console.log( filter );
    //   }, [ filter ] );
    useEffect( () => {//set current location to filter
      getCurrentLocation( ( getLocation:Promise<any> ) => {
        getLocation.then( data => {
          const location = data?.data;
          setFilter( { ...filter,
                      location: {
                        city: location?.address.city,
                        district: location?.address.city_district,
                        commune: location?.address.suburb,
                        latitude: location?.lat as number,
                        longitude: location?.lon as number,
                      },
                    }as HomeFilter);
        } );
      } );
    }, [] );
    //handle functions
    return (
      <>
        <Banner
          getBannerApi = { "" }
          banners = {
            [
              {
                bannerUrls: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                firstPartTitle: "Travel the",
                secondPartTitle: "World",
                location: "Pragser Wildsee, Italy",
              }, {
              bannerUrls: "https://images.unsplash.com/photo-1517057011470-8f36d636e6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              firstPartTitle: "Travel the",
              secondPartTitle: "World",
              location: "Pragser Wildsee, Italy",
            }, {
              bannerUrls: "https://images.unsplash.com/flagged/photo-1552035791-b3cc1632e933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
              firstPartTitle: "Travel the",
              secondPartTitle: "World",
              location: "Pragser Wildsee, Italy",
            }, {
              bannerUrls: "https://images.unsplash.com/photo-1574700273608-7962d3602a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              firstPartTitle: "Travel the",
              secondPartTitle: "World",
              location: "Pragser Wildsee, Italy",
            }, {
              bannerUrls: "https://images.unsplash.com/photo-1605045544284-d13c6d6a60a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              firstPartTitle: "Travel the",
              secondPartTitle: "World",
              location: "Pragser Wildsee, Italy",
            },
            ]
          }
        />
        {/* <FilterBar onchangeFilter = { setFilter } initFilter = { filter } /> */}
        <section className = "app-main">
          <LeftContent filter={filter}/>
          {/*<RightContent />*/}
        </section>
      </>
    );
  }
  export default Home;








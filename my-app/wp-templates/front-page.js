import * as MENUS from 'constants/menus';

import { useQuery, gql } from '@apollo/client';

import AaronHero from 'my-app/components/AaronHero/AaronHero.js';
import AaronServicesHome from 'my-app/components/AaronServicesHome/AaronServicesHome.js';
import AaronStepper from 'my-app/components/AaronStepper/AaronStepper.js';
import AaronFooter from 'my-app/components/AaronFooter/AaronFooter.js';

import {
    NavigationMenu,
    SEO,
    Posts,
    Testimonials, AppBar,
} from 'my-app/components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';

const postsPerPage = 3;

export default function Component() {
    const { data, loading } = useQuery(Component.query, {
        variables: Component.variables(),
    });
    if (loading) {
        return null;
    }

    const { title: siteTitle, description: siteDescription } =
        data?.generalSettings;


    return (
        <>
            <SEO title={siteTitle} description={siteDescription} />

            <AppBar />
            <AaronHero />
            <AaronServicesHome />
            <AaronStepper />
            <AaronFooter />
        </>
    );
}

Component.variables = () => {
    return {
        headerLocation: MENUS.PRIMARY_LOCATION,
        footerLocation: MENUS.FOOTER_LOCATION,
        first: postsPerPage,
    };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  ${Testimonials.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(first: $first) {
      nodes {
        ...PostsItemFragment
      }
    }
    testimonials {
      nodes {
        ...TestimonialsFragment
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
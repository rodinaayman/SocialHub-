import React, { useContext } from 'react'
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";

import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoHome } from 'react-icons/io5';
import { FiSettings } from 'react-icons/fi';

export default function App() {

  const { userToken, removeUserToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  function logoutHandler() {
    removeUserToken();
    navigate('/auth/login');
  }

  return (
    <HeroUINavbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-2xl">SocialHub</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">

        <NavbarItem isActive={location.pathname === '/'}>
          <Link
            color={location.pathname === '/' ? 'primary' : 'foreground'}
            href="/"
            className="flex items-center text-xl hover:text-primary transition-colors"
          >
            <IoHome />
            <span className='ms-1.5'>Feed</span>
          </Link>
        </NavbarItem>

        <NavbarItem isActive={location.pathname.includes('/profile')}>
          <Link
            color={location.pathname.includes('/profile') ? 'primary' : 'foreground'}
            href="/profile"
            className="flex items-center text-xl hover:text-primary transition-colors"
          >
            <CgProfile />
            <span className='ms-1.5'>Profile</span>
          </Link>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {userToken ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform hover:scale-105"
                color="secondary"
                name="User"
                size="sm"
                src={userData?.photo || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-sm">Signed in as</p>
                <p className="font-semibold text-sm truncate max-w-[200px]">
                  {userData?.email}
                </p>
              </DropdownItem>
              <DropdownItem key="settings" href="/settings" startContent={<FiSettings />}>
                Settings
              </DropdownItem>
              <DropdownItem key="profile_page" href="/profile">
                My Profile
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onClick={logoutHandler}
                className="text-red-600 font-semibold"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-2">
            <NavbarItem>
              <Button as={Link} color="primary" href="/auth/login" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/auth/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
}
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import logoimg from "../../assets/logo.png";
import { Wallet } from "../wallet";
import { WalletConnectButton, WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { Link, useParams } from "react-router-dom";
// import { SignMessage } from "../wallet/signin";

// import { SignMessage } from "./signin";

const navigation = [
  { name: "Register", href: "/register" },
  { name: "Dns", href: "/dns" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Check", href: "/check" },
];
console.log(location);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function capitalizeFirstCharacter(inputString) {
  if (inputString.length === 0) {
    return inputString; // Return the string as is if it's empty
  }
  return inputString[0].toUpperCase() + inputString.slice(1);
}

export default function Navbar() {
  const [navItem, setnNavItem] = useState(navigation[0].name);
  // const [path, setPath] = useState('/');
  const params = window.location.pathname

  useEffect(()=>{
    // setnNavItem(params)
    setnNavItem(capitalizeFirstCharacter(params.split('/')[1]));
  },[params])
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto"
                    src={logoimg}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          navItem == item.name
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={navItem == item.name ? "page" : undefined}
                        onClick={() => {
                          setnNavItem(item.name);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <WalletMultiButton />
                {/* <SignMessage /> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

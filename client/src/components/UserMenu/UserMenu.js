import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useKeycloak } from "@react-keycloak/web";
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  
  const [keycloak] = useKeycloak();
  
  const userName = keycloak.tokenParsed.preferred_username;
  
  const logout = () => {
    keycloak.logout();
  };
  
  return (
      <div className={styles["user-menu"]}>
        <Menu secondary>
          <div className={styles["user-menu-icon"]}>
            <Icon size='large' name='user circle outline'/>
          </div>
          <Dropdown
              className={styles["user-menu-dropdown"]}
              item
              text={userName}
          >
            <Dropdown.Menu>
              <Dropdown.Item
              >
                Profile Settings
              </Dropdown.Item>
              <Dropdown.Item
                  onClick={logout}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
  );
};

export default UserMenu;

"use client";
import useSession from "@library/hooks/useSession";
import { useRouter } from "next/navigation";
import { MenuItem, MenuList, ListItemIcon, ListItemText, Box } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsIcon from "@mui/icons-material/Collections";

const Sidebar: FC<any> = (props) => {
    const { user } = useSession();
    const router = useRouter();
    return (
        <MenuList sx={{ width: "100%" }}>
            <MenuItem onClick={() => router.push("/dashboard/admin")}>
                <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Админ</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/user")}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>User</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/book")}>
                <ListItemIcon>
                    <BookIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Book</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/category")}>
                <ListItemIcon>
                    <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Category</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/author")}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Author</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/collection")}>
                <ListItemIcon>
                    <CollectionsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Collection</ListItemText>
            </MenuItem>
        </MenuList>
    );
};

export default Sidebar;

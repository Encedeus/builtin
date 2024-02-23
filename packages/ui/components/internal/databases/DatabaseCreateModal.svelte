<script lang="ts">
    import {DatabaseIcon, CardModal, Input, Button} from "@repo/ui";
    import {createEventDispatcher} from 'svelte';

    export let className = "";
    export let open: boolean;

    let name: string,
        location: string,
        address: string,
        port: number,
        dbUser: string,
        dbUserPassword: string,
        dbName: string;

    const dispatch = createEventDispatcher();

    function onSubmit() {
        dispatch("dbSubmit", {
            name: name,
            location: location,
            uri: {
                address: address,
                port: port
            },
            dbUser: dbUser,
            dbUserPassword: dbUserPassword,
            dbName: dbName
        });
    }
</script>

<CardModal className="{className}" open={open} on:close>
    <DatabaseIcon slot="icon"/>
    <span slot="title">Create database</span>

    <div slot="content" id="content" class="">
        <Input label="name"
               placeholder="name"
               className="w-full"
               bind:value={name}
        ></Input>
        <Input label="location"
               placeholder="location"
               className="w-full"
               bind:value={location}
        ></Input>

        <div id="uriInput">
            <Input size=" "
                   className="w-[375px]"
                   label="address"
                   placeholder="database address"
                   bind:value={address}
            ></Input>
            <Input size=" "
                   className="w-[95px]"
                   label="port"
                   placeholder="port"
                   bind:value={port}
            ></Input>
        </div>

        <Input label="user"
               placeholder="database user"
               className="w-full"
               bind:value={dbUser}
        ></Input>
        <Input label="user password"
               type="password"
               placeholder="database user password"
               className="w-full"
               bind:value={dbUserPassword}
        ></Input>
        <Input label="database name"
               placeholder="database name"
               className="w-full"
               bind:value={dbName}
        ></Input>

        <Button className="m-auto" on:click={onSubmit}>Create</Button>
    </div>

</CardModal>

<style>
    #uriInput {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px 10px;
    }

    #content {
        margin: 10px 20px 20px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        gap: 15px 10px;
    }
</style>
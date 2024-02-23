<script lang="ts">
    export let status: "running" | "starting" | "stopping" | "stopped" | "restarting";

    const colors = new Map<string, string>([
        ["running", "bg-green-500"],
        ["starting", "bg-yellow-200"],
        ["stopping", "bg-orange-700"],
        ["stopped", "bg-red-500"],
        ["restarting", "bg-lime-400"],
    ]);


</script>

<div class="text-white flex flex-row items-center gap-2.5">
    <span class="inline-block rounded-full w-7 h-7 {colors.get(status)}"/>
    <span class="font-medium uppercase">{status.slice(0, 1).toUpperCase().concat(status.slice(1))}</span>
</div>
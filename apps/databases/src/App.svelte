<script lang="ts">
    import { Card, DatabaseCard, DatabaseIcon } from "@repo/ui";
    export let className = "";
</script>

<div>
    <Card headerHeight="sm" fixedWidth={true} fixedHeight={true} height="lg" width="screen" className={className}>
        <span slot="title">Databases</span>
        <DatabaseIcon slot="icon"/>
        <div slot="content" class="flex flex-col items-stretch gap-3 p-6">
            <DatabaseCard/>
        </div>
    </Card>
</div>

<script lang="ts">
    import {Card, CardHeader, ServerIcon, BoxIcon, DriveIcon, CpuIcon} from "@repo/ui";
</script>

<main class="p-10 flex flex-col">
    <CardHeader className="self-start mb-5 text-white font-inter" size="lg">
        Console
    </CardHeader>
    <div class="flex flex-row">
        <section>
            <Card height="sm" className="p-4">
                <span slot="title" class="gap-2.5 flex flex-row items-center">
                    <ServerIcon className="inline-block"/>
                    <span>Server</span>
                </span>
                <div slot="content" class="py-8 px-11">
                    <div class="flex flex-col gap-5">
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <span class="inline-block rounded-full w-7 h-7 bg-white"/>
                            <span class="font-medium uppercase">Starting</span>
                        </div>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <CpuIcon width={32} height={32} />
                            <span class="font-medium uppercase">211.19%</span>
                        </div>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <BoxIcon width={32} height={32} />
                            <span class="font-medium uppercase">307.02 MB / 512 MB</span>
                        </div>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <DriveIcon width={32} height={32} />
                            <span class="font-medium uppercase">184.91 MB / 20 GB</span>
                        </div>
                    </div>
                </div>
            </Card>
        </section>
        <section></section>
    </div>
</main>

<style>
</style>

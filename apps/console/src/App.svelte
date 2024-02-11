<script lang="ts">
    import { Card, CardHeader, ServerIcon, BoxIcon, DriveIcon, CpuIcon, Button } from "@repo/ui";
    import ApexCharts from "apexcharts";
    import { onMount } from "svelte";

    const options = {
        chart: {
            height: 350,
            type: "area"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        xaxis: {
            type: "datetime",
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            },
        },
        /*theme: {
            palette: "palette3"
        },*/
        theme: {
            monochrome: {
                enabled: true,
                color: "#10B981",
                shadeTo: "light",
                shadeIntensity: 0.65,
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.05,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 0.1,
                opacityTo: 0.75,
                stops: [0, 60, 30],
                colorStops: []
            }
        }
    };

    const cpuOptions = {
        ...options,
        series: [{
            name: "CPU usage",
            data: [31, 40, 28, 51, 42, 109, 100],
        }]
    };

    const memoryOptions = {
        ...options,
        series: [{
            name: "Memory usage",
            data: [31, 40, 28, 51, 42, 109, 100],
        }]
    };

    onMount(() => {
        const memoryChart = new ApexCharts(document.querySelector("#memory-chart"), memoryOptions);
        memoryChart.render();

        const cpuChart = new ApexCharts(document.querySelector("#cpu-chart"), cpuOptions);
        cpuChart.render();
    });
</script>

<main class="p-10 flex flex-col">
    <CardHeader className="self-start mb-5 text-white font-inter" size="lg">
        Console
    </CardHeader>
    <div class="flex flex-row">
        <section class="flex flex-col gap-7">
            <Card height="sm">
                <span slot="title" class="gap-2.5 flex flex-row items-center">
                    <ServerIcon className="inline-block"/>
                    <span>Server</span>
                </span>
                <div slot="content" class="py-8 px-11">
                    <div class="flex flex-col gap-5">
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <span class="inline-block rounded-full w-7 h-7 bg-yellow-200"/>
                            <span class="font-medium uppercase">Starting</span>
                        </div>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <CpuIcon width={32} height={32}/>
                            <span class="font-medium uppercase">211.19%</span>
                        </div>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <BoxIcon width={32} height={32}/>
                            <span class="font-medium uppercase">307.02 MB / 512 MB</span>
                        </div>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <DriveIcon width={32} height={32}/>
                            <span class="font-medium uppercase">184.91 MB / 20 GB</span>
                        </div>
                        <div class="self-center mt-4 flex flex-row gap-2 items-center">
                            <Button size="sm" color="transparent">Start</Button>
                            <Button size="sm" color="transparent">Restart</Button>
                            <Button size="sm" color="red">Stop</Button>
                        </div>
                    </div>
                </div>
            </Card>
            <Card height="sm">
                <span slot="title" class="gap-2.5 flex flex-row items-center">
                    <BoxIcon width={32} height={32}/>
                    <span>Memory usage</span>
                </span>
                <div slot="content">
                    <div id="memory-chart"></div>
                </div>
            </Card>
            <Card height="sm">
                <span slot="title" class="gap-2.5 flex flex-row items-center">
                    <CpuIcon width={32} height={32}/>
                    <span>CPU usage</span>
                </span>
                <div slot="content">
                    <div id="cpu-chart"></div>
                </div>
            </Card>
        </section>
        <section></section>
    </div>
</main>

<style>
</style>

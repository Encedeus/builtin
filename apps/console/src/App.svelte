<script lang="ts">
    import {Card, CardHeader, ServerIcon, BoxIcon, DriveIcon, CpuIcon, Button, ServerRunStatus} from "@repo/ui";
    import ApexCharts from "apexcharts";
    import {onMount} from "svelte";
    import {api} from "./lib/services/api";
    import WebSocket from 'ws';
    import {WebSocket} from "vite";
    import RawData = WebSocket.RawData;

    const urlParams = new URLSearchParams(window.location.search);
    const serverId = urlParams.get("serverId");


    const options = {
        chart: {
            height: 350,
            type: "area",
            foreColor: "#fff",
            fontFamily: "Inter, Lato, sans-serif",
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        xaxis: {
            type: "datetime",
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
            axisBorder: {
                show: true,
                color: "#312E81",
                height: 1,
                width: "2.5px",
                offsetX: 0,
                offsetY: 0
            },
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: "#312E81",
                height: 1,
                width: "2.5px",
                offsetX: -3.5,
                offsetY: 0
            },
        },
        tooltip: {
            theme: "dark",
            x: {
                format: "dd/MM/yy HH:mm"
            },
        },
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
        },
        grid: {
            show: true,
            borderColor: "#312E81",
            position: "back",
            strokeDashArray: 0,
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 10,
            },
        }
    };

    const cpuOptions = {
        ...options,
        series: [{
            name: "CPU usage",
            data: [31, 40, 28, 51, 42, 109, 100],
        }],
        yaxis: {
            ...options.yaxis,
            labels: {
                formatter: (v) => `${v}%`,
            }
        }
    };

    const memoryOptions = {
        ...options,
        series: [{
            name: "Memory usage",
            data: [31, 40, 28, 51, 42, 109, 100, 120],
        }],
        yaxis: {
            ...options.yaxis,
            labels: {
                formatter: (v) => `${v} MB`,
            }
        }
    };

    let serverStatus = "loading";
    let cpuUtilisation = 24.6;
    let connectionError = "";

    function setCup() {
        cpuUtilisation += Number((cpuUtilisation * ((Math.random() - .5) * .02)).toFixed(2));
    }

    async function loadStatus() {
        const resp = await api.serversService.getServerStatus(serverId!);

        if (resp.error) {
            serverStatus = "failed to check";
        }

        serverStatus = resp.response.status;
        console.log(serverStatus);
    }

    async function loadData() {
        loadStatus();
    }


    onMount(() => {
        const memoryChart = new ApexCharts(document.querySelector("#memory-chart"), memoryOptions);
        memoryChart.render();

        const cpuChart = new ApexCharts(document.querySelector("#cpu-chart"), cpuOptions);
        cpuChart.render();

        console.log("Server id: " + serverId);

        loadData();
    });

    async function onClickStart() {
        const resp = await api.serversService.startServer(serverId!);

        if (resp.error) {
            connectionError = resp.error?.message;
            return;
        }
        connectionError = "";
    }

    async function onClickRestart() {
        const resp = await api.serversService.restartServer(serverId!);

        if (resp.error) {
            connectionError = resp.error?.message;
            return;
        }
        connectionError = "";
    }

    async function onClickStop() {
        const resp = await api.serversService.stopServer(serverId!);

        if (resp.error) {
            connectionError = resp.error?.message;
            return;
        }
        connectionError = "";
    }


    let terminal = "";
    let command = "";

    const ws = new WebSocket(`ws://servers/${serverId}/console`, {
        perMessageDeflate: false
    });

    ws.on('error', console.error);

    ws.on('open', function open() {console.log("WebSocket open");});

    ws.on('message', function message(data: RawData) {
        const newLine = data.toString()
        terminal += `${newLine}\n`
    });

    function handleSendCommand(event: KeyboardEvent) {
        if (event.key != "Enter") {
            return;
        }

        const message = JSON.stringify({cmd: command});

        ws.send(message);
    }


</script>

<main class="p-10 flex flex-col">
    <CardHeader className="self-start mb-5 text-white font-inter" size="lg">
        Console
    </CardHeader>
    <div class="flex flex-row gap-9">
        <section class="flex flex-col gap-7">
            <Card height="sm">
                <span slot="title" class="gap-2.5 flex flex-row items-center">
                    <ServerIcon className="inline-block"/>
                    <span>Server</span>
                </span>
                <div slot="content" class="py-8 px-11">
                    <div class="flex flex-col gap-5">
                        <ServerRunStatus status="{serverStatus}"/>
                        <div class="text-white flex flex-row items-center gap-2.5">
                            <CpuIcon width={32} height={32}/>
                            <span class="font-medium uppercase">{cpuUtilisation}%</span>
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
                            <Button size="sm" color="transparent" on:click={onClickStart}>Start</Button>
                            <Button size="sm" color="transparent" on:click={onClickRestart}>Restart</Button>
                            <Button size="sm" color="red" on:click={onClickStop}>Stop</Button>
                        </div>

                        <div class="self-center text-red-500">
                            {connectionError}
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
        <section class="w-full h-full">
            <div class="bg-indigo-950 rounded-lg rounded-b-none h-[48rem] py-4 px-6 text-white overflow-y-auto break-words overflow-x-hidden">
                {terminal}
            </div>
            <div class="bg-indigo-900 h-11 rounded-b-lg p-2.5 px-5 text-white flex gap-1.5 flex-shrink">
                <span class="font-medium text-md">$</span>
                <input on:keydown={handleSendCommand} bind:value={command} type="text" placeholder="Type your command here"
                       class="outline-indigo-500 opacity-85 focus:outline rounded-sm p-1 outline-2 bg-indigo-900 inline w-full">
            </div>
        </section>
    </div>
</main>

<style>
</style>

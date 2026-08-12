"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

export default function ParticlesBg() {
    const initParticles = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <ParticlesProvider init={initParticles}>
            <Particles
                id="4A-Tek-constellation"
                className="pointer-events-none absolute inset-0 -z-20"
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    fullScreen: { enable: false },
                    detectRetina: true,
                    particles: {
                        number: { value: 80, density: { enable: true, area: 900 } },
                        color: { value: "#ffffff" },
                        opacity: { value: 0.28 },
                        size: { value: { min: 1, max: 3 } },
                        links: { enable: true, distance: 140, opacity: 0.2, width: 1, color: "#ffffff" },
                        move: { enable: true, speed: 2.0, direction: "none", outModes: { default: "bounce" } },
                    },
                    interactivity: { events: { onHover: { enable: false }, onClick: { enable: false }, resize: true } },
                }}
            />
        </ParticlesProvider>
    );
}

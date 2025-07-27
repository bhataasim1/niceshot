"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { GithubSolid } from "../icons/github-solid-icon";
import { SquareXTwitter } from "../icons/twitter-icon";
import { OutlineDiscord } from "../icons/discord-icon";

export function Footer() {

  return (
    <motion.footer
      className="bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div className="md:col-span-1 max-w-sm">
            <div className="flex justify-start items-center gap-2 mb-4">
              <Image src="/logo-white.png" alt="Niceshot" width={40} height={40} className="hidden dark:block" />
              <Image src="/logo-black.png" alt="Niceshot" width={40} height={40} className="block dark:hidden" />
              <span className="font-bold text-lg">Niceshot</span>
            </div>
            <p className="text-sm md:text-left text-muted-foreground mb-5">
              The open-source mockup tool for beautiful, professional visuals. Fast, flexible, and made for creators.
            </p>
            <div className="flex justify-start gap-3">
              <Link
                href="https://github.com/bhataasim1/niceshot"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubSolid className="size-5" />
              </Link>
              <Link
                href="https://x.com/BhatAasim9"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SquareXTwitter className="size-5" />
              </Link>
              <Link
                href="https://discord.gg/KWXeTcRN"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <OutlineDiscord className="size-5" />
              </Link>
            </div>
          </div>

          <div className="flex gap-12 justify-start items-start py-2">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://github.com/bhataasim1/niceshot/blob/main/README.md"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        

        <div className="pt-2 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Niceshot, All Rights Reserved</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
import { PROFILE } from '../../data/profile';
import { PROJECTS, findProjectBySlug } from '../../data/projects';
import { FUN_FACTS, SKILL_GROUPS } from '../../data/skills';

export interface CommandResult {
  lines: readonly string[];
  clearScreen?: boolean;
  projectToOpen?: string;
}

interface Command {
  description: string;
  run: (args: string[]) => CommandResult;
  /** Easter eggs: they work, but `help` does not list them. */
  hidden?: boolean;
}

const COMMANDS: Record<string, Command> = {
  help: {
    description: 'list available commands',
    run: () => ({
      lines: Object.entries(COMMANDS)
        .filter(([, command]) => !command.hidden)
        .map(([name, command]) => `${name.padEnd(10)} ${command.description}`),
    }),
  },
  whoami: {
    description: 'who is Nour?',
    run: () => ({
      lines: [
        `${PROFILE.fullName} — full-stack JavaScript engineer, tech lead, mentor and creative builder.`,
        `Based in ${PROFILE.location}.`,
        "Type 'help' to see what else you can ask.",
      ],
    }),
  },
  skills: {
    description: 'what I work with',
    run: () => ({
      lines: SKILL_GROUPS.map((group) => `${group.name.padEnd(14)} ${group.skills.join(', ')}`),
    }),
  },
  projects: {
    description: 'list my projects',
    run: () => ({
      lines: [
        ...PROJECTS.map((project) => `${project.slug.padEnd(26)} ${project.tagline}`),
        '',
        "Type 'open <name>' to open one, e.g. 'open kc-media'.",
      ],
    }),
  },
  open: {
    description: 'open a project in Explorer',
    run: ([slug]) => {
      if (!slug) {
        return { lines: ['Usage: open <project>. Try "projects" to see the list.'] };
      }
      if (!findProjectBySlug(slug)) {
        return { lines: [`open: no project named "${slug}".`] };
      }
      return { lines: [`Opening ${slug}…`], projectToOpen: slug };
    },
  },
  contact: {
    description: 'how to reach me',
    run: () => ({
      lines: [
        `GitHub    ${PROFILE.links.github}`,
        ...(PROFILE.links.linkedin ? [`LinkedIn  ${PROFILE.links.linkedin}`] : []),
        "Or open the Mail app and say hi. I don't bite (only bugs).",
      ],
    }),
  },
  funfacts: {
    description: 'a few things about me',
    run: () => ({ lines: FUN_FACTS.map((fact) => `• ${fact}`) }),
  },
  clear: {
    description: 'clear the screen',
    run: () => ({ lines: [], clearScreen: true }),
  },
  sudo: {
    description: 'become admin',
    hidden: true,
    run: () => ({ lines: ['Nice try. Nour is the only admin here. 😌'] }),
  },
  coffee: {
    description: 'refuel',
    hidden: true,
    run: () => ({ lines: ['☕ Brewing… done. Productivity +10, patience +5.'] }),
  },
  sleep: {
    description: 'rest',
    hidden: true,
    run: () => ({
      lines: ['😴 sleepybani mode activated.', '(Yes, that is my GitHub name. Now you know why.)'],
    }),
  },
  hello: {
    description: 'say hi',
    hidden: true,
    run: () => ({ lines: ["Hi! 👋 Type 'help' to explore, or open Mail to say hello for real."] }),
  },
};

export function runCommand(input: string): CommandResult {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) {
    return { lines: [] };
  }

  const command = COMMANDS[name.toLowerCase()];
  if (!command) {
    return { lines: [`command not found: ${name}. Type 'help' to see the commands.`] };
  }
  return command.run(args);
}

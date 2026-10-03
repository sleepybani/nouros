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
}

const COMMANDS: Record<string, Command> = {
  help: {
    description: 'list available commands',
    run: () => ({
      lines: Object.entries(COMMANDS).map(
        ([name, command]) => `${name.padEnd(10)} ${command.description}`,
      ),
    }),
  },
  whoami: {
    description: 'who is Nour?',
    run: () => ({
      lines: [
        `${PROFILE.name} — full-stack JS developer, creative builder, problem solver.`,
        `Based in ${PROFILE.location}.`,
        "Type 'help' to see what else you can ask.",
      ],
    }),
  },
  skills: {
    description: 'what I work with',
    run: () => ({
      lines: SKILL_GROUPS.map((group) => `${group.name.padEnd(10)} ${group.skills.join(', ')}`),
    }),
  },
  projects: {
    description: 'list my projects',
    run: () => ({
      lines: [
        ...PROJECTS.map((project) => `${project.slug.padEnd(22)} ${project.tagline}`),
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

import { GraphQLSeeds } from "@/Application/Ship/Seeds/index";
import { Application } from "@/Application/Ship/Modules/Production/Application";

GraphQLSeeds.Init();
Application.Run();

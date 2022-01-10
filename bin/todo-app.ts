#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { ToDoWebsiteStack } from '../lib/todo-construct';

const app = new cdk.App();
new ToDoWebsiteStack(app, 'ToDoWebsiteStack');

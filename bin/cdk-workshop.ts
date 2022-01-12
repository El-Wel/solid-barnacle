#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { TodoWebsiteStack } from '../lib/todo-construct';

const app = new cdk.App();
new TodoWebsiteStack(app, 'TodoWebsiteStack');

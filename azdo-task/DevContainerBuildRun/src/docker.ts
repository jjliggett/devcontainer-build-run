import * as task from 'azure-pipelines-task-lib/task'
import * as docker from '../../../common/src/docker'
import {exec} from './exec'

export async function isDockerBuildXInstalled(): Promise<boolean> {
	return await docker.isDockerBuildXInstalled(exec)
}
export async function buildImage(
	imageName: string,
	imageTag: string | undefined,
	checkoutPath: string,
	subFolder: string,
	skipContainerUserIdUpdate: boolean
): Promise<string> {
	console.log('🏗 Building dev container...')
	try {
		return await docker.buildImage(
			exec,
			imageName,
			imageTag,
			checkoutPath,
			subFolder,
			skipContainerUserIdUpdate
		)
	} catch (error) {
		task.setResult(task.TaskResult.Failed, error)
		return ''
	}
}

export async function runContainer(
	imageName: string,
	imageTag: string | undefined,
	checkoutPath: string,
	subFolder: string,
	command: string,
	envs?: string[],
	privileged?: boolean
): Promise<boolean> {
	console.log('🏃‍♀️ Running dev container...')
	try {
		await docker.runContainer(
			exec,
			imageName,
			imageTag,
			checkoutPath,
			subFolder,
			command,
			envs,
			privileged
		)
		return true
	} catch (error) {
		task.setResult(task.TaskResult.Failed, error)
		return false
	}
}

export async function pushImage(
	imageName: string,
	imageTag: string | undefined
): Promise<boolean> {
	console.log('📌 Pushing image...')
	try {
		await docker.pushImage(exec, imageName, imageTag)
		return true
	} catch (error) {
		task.setResult(task.TaskResult.Failed, error)
		return false
	}
}

import sys
import re
import os
import shutil

def log(content):
    if debug:
        print(content)

def readFile(scanFile='*.podspec'):
    #读取[初试].podspec文件
    fo = open(scanFile,'rb+')
    log('file name:' + fo.name)
    #1.找到全部的s.dependency '[目标]',:path => '*'下的[目标].podspec文件
    source_pattern = re.compile(b's.dependency_path\s*[\"\'](.*)[\"\']',re.DOTALL)
    target_pod_list = []
    while 1:
        line = fo.readline()
        if not line:
            break
        new_line = line.strip().lstrip().rstrip(b',')
        log('read line'+line.decode('utf-8'))
        matchObj = source_pattern.match(new_line)
        if not matchObj:
            continue
        poddir = matchObj.group(1)
        target_pod_list.append(poddir)
        log('get forwards path:'+poddir.decode('utf-8'))
    fo.close()

    #2.读对应目标podspec文件，移动s.source_file中目录的文件，拼接s.dependency字段到[初始].podspec下
    for poddir in target_pod_list:
        for file in os.listdir(poddir):
            file_path = poddir.decode('utf-8')+'/'+file.decode('utf-8')
            if file_path and os.path.isfile(file_path) and os.path.splitext(file_path)[1] == '.podspec':
                log("podspec here:"+file.decode('utf-8'))
                handlePodDir(file_path)
    return

def handlePodDir(filePath,destination='./'):     #默认目标是当前python文件所在目录为代码目录
    #找到目标目录下的podspec文件,并读取s.source_file,s.framework,s.dependency三个字段
    source_file_pattern = re.compile(b'^\s*s.source_files\s*=\s*([\'\"].*[\'\"])$',re.DOTALL)
    framework_pattern = re.compile(b'^\s*s.framework\s*=\s*([\'\"].*[[\'\"])$',re.DOTALL)
    dependency_pattern = re.compile(b'^\s*s.dependency\s*([\'\"].*[[\'\"])$',re.DOTALL)

    target_frameworks = ''
    target_dependency = []
    target_source_file = []
    fo = open(filePath, 'rb')
    while 1:
        line = fo.readline()
        if not line:
            break
        new_line = line.strip().lstrip().rstrip(b',')
        #1.找到framework依赖
        framework_match = framework_pattern.match(new_line)
        if framework_match:
            target_frameworks = framework_match.group(1)
            continue
        #2.找到dependency依赖
        dependency_match = dependency_pattern.match(new_line)
        if dependency_match:
            target_dependency = dependency_match.group(1)
            continue
        #3.找到需要移动的文件目录
        source_file_match = source_file_pattern.match(new_line)
        if source_file_match:
            source_list = source_file_match.group(1)
            continue
    fo.close()

    pass

def copyFile(sourceDirPath, target='./'):
    # if sourceDirPath.find(".svn") > 0:
    #     return
    if not os.path.isdir(target):
        return
    shutil.copytree(sourceDirPath, target)
    # for file in os.listdir(sourceDirPath):
    #     sourceFile = os.path.join(sourceDirPath, file)
    #     targetFile = os.path.join(target, file)
    #     if os.path.isfile(sourceFile) :
    #         if not os.path.exists(target) :
    #             os.makedirs(target)
    #         if not os.path.exists(targetFile):
    #             open(targetFile, "wb").write(open(sourceFile, "rb").read())
    return

if __name__ == '__main__' :
    debug = True
    scanFile = './GPCKitPod.podspec'
    readFile(scanFile)
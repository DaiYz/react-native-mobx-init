#!/bin/bash

echo ---------------------------------------
echo React Native 0.55.x
echo Text Input Script
echo ---------------------------------------

ProcessDir=$(pwd)
IssueFile_1=RCTBaseTextInputShadowView.m
IssueFile_2=RCTBaseTextInputView.m

PATCH_FILE_DIR="${ProcessDir}"/node_scripts/ios/

REACT_NATIVE_DIR="${ProcessDir}"/node_modules/react-native/
REACT_NATIVE_LIBRARYS_DIR="${REACT_NATIVE_DIR}"/Libraries/Text/TextInput/

# cp -f $IssueFile_1 aaaa.m
cp -f "${PATCH_FILE_DIR}"${IssueFile_1} "${REACT_NATIVE_LIBRARYS_DIR}"${IssueFile_1}
cp -f "${PATCH_FILE_DIR}"${IssueFile_2} "${REACT_NATIVE_LIBRARYS_DIR}"${IssueFile_2}

# Nextjs replicate segfault

When upgrading from version 11 -> 12, our jest unit tests ran into a segfault raised with no other changes.

This repository shows 5 scenarios:

1. [✓] jest unit test with version 11.1.3 without a `next.config.js`
2. [✓] jest unit test with version 11.1.3 with a `next.config.js`
3. [✓] jest unit test with version 12.0.7 without a `next.config.js`
4. [✗] jest unit test with version 12.0.7 with a `next.config.js`
5. [✓] jest unit test with version 12.0.7 with a `next.config.js` with custom server options `conf: require('next.config')`
6. [✗] jest unit test with version canary with a `next.config.js` and `segfault-handler`

It seems there is an issue resolving next.config.js in the latest version that is causing the jest tests to exit before completing

```
zsh: segmentation fault  npm test
```

With segfault-handler the output is:

```
PID 86507 received SIGSEGV for address: 0x0
0   segfault-handler.node               0x000000010cd2d0aa _ZL16segfault_handleriP9__siginfoPv + 298
1   libsystem_platform.dylib            0x00007fff2055ed7d _sigtramp + 29
2   ???                                 0x0000000000000006 0x0 + 6
3   node                                0x00000001083acede _ZN2v88internal7Isolate38RunHostImportModuleDynamicallyCallbackENS0_6HandleINS0_6ScriptEEENS2_INS0_6ObjectEEENS0_11MaybeHandleIS5_EE + 286
4   node                                0x00000001087a5b6c _ZN2v88internal25Runtime_DynamicImportCallEiPmPNS0_7IsolateE + 332
5   node                                0x0000000108b4a474 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvInRegister_NoBuiltinExit + 52
6   node                                0x0000000108bd8d4e Builtins_CallRuntimeHandler + 78
7   node                                0x0000000108adcd8a Builtins_InterpreterEntryTrampoline + 202
8   node                                0x0000000108b0c69f Builtins_AsyncFunctionAwaitResolveClosure + 63
zsh: segmentation fault  npm test
```

## Setup

To replicate each scenario:

1. navigate the terminal into the scenario folder
   - `cd 01-next-11-no-config-success`
2. install dependencies
   - `npm i`
3. build next application
   - `npm run build`
4. run unit tests
   - `npm test`

## Versions

```
% node --version
v16.13.1
% npm --version
8.1.2
```

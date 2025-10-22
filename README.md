# Depx CLI
Analyze dependencies _before_ you install.


> ⚠️ **Experimental**  
> This is an early iteration. It is missing features and not tested across platforms (e.g. Windows).  
> You can raise an issue or suggest a feature on the [issue tracker](https://github.com/jacob-bennett/depx-cli/issues/new). All feedback is appreciated.

## What is it?
A drop in replacement for npm install.  
Allows you to see key metrics such as total transitive dependencies and cumulative lines of code before installing a package.  
It also shows weekly downloads, which can help spot typosquatting attacks. 

## Install
```bash
npm install -g @depx/cli
```

## Usage
To install a package, run `depx install <package-name>`.

### Example
```console
$ depx install express
✔ Analysis loaded (740ms)
express @ 5.1.0
────────────────────────────────────────
Released:                6 months ago
Weekly downloads:        50.1M
Transitive dependencies: 70
Total LoC:               20.6K
View more:               https://depx.co/pkg/express
────────────────────────────────────────
Proceed with installation? (y/N): 
```

Enter "y" or "yes" to proceed with installation using `npm` from your system PATH:

```console
Proceed with installation? (y/N): y
npm install express

added 80 packages, and audited 81 packages in 1s

16 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Contact
If you'd like to suggest a feature, report an issue or ask a question, feel free to [raise an issue](https://github.com/jacob-bennett/depx-cli/issues/new).

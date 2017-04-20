# Module: Heute ist
Zeigt die heutigen Tage von welcher-tag-ist-heute.org in einer Schleife an

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'heute_ist',
		position: 'lower_third',	// This can be any of the regions.
									// Best results in one of the middle regions like: lower_third
		config: {
			// The config property is optional.
			// If no config is set, an example calendar is shown.
			// See 'Configuration options' for more information.
		}
	}
]
````


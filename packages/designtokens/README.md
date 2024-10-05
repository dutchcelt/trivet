# Default Trivet tokens

**NOTE**: TOKEN NAMING UNDER REVIEW

Trivet utilises the popular [Style Dictionary](https://amzn.github.io/style-dictionary) approach to tokens. We can utilise the W3C Design Token standard. (There is a risk of breaking changes as the format is still in draft)

## The crazy eight

Tokens are set up in 8 foundational types.
Trivet provides the foundation with context via topics.

### Colour

The colour tokens contain a basic colour library based on the the [open source color pallet](https://yeun.github.io/open-color/).
Note that these colours are omitted from the main set of custom properties. Library files like these can be very large and shouldn't be exposed as part of the Styling API.

## Token structure

Note that Trivet wouldn't use all of these. This is a structure to help create tokens with consistent and predictable names.

<table>
		<tr>
			<th valign="top" rowspan="2">Namespace</th>
			<th valign="top" rowspan="2">Foundation</th>
			<th valign="top" rowspan="2">Topic</th>
			<th valign="top" rowspan="2">Property</th>
			<th valign="top" colspan="3">Modifier</th>
		</tr>
		<tr>
			<th>Variant</th><th>Range</th><th>State</th>
		</tr>
		<tr>
			<td valign="top" rowspan="80">trvt</td><td>color</td><td>editorial</td><td>text</td><td>primary</td><td>000-100</td><td>hover</td>
		</tr>
		<tr>
			<td>layout</td><td>promotional</td><td>background</td><td>secondary</td><td>light-bold</td><td>visited</td>
		</tr>
		<tr>
			<td>spacing</td><td>message</td><td>border</td><td>tertiary</td><td>thin-thick</td><td>active</td></tr>
		<tr>
			<td>size</td><td>layer</td><td>easing</td><td>highlight</td><td>low-high</td><td>focus</td></tr>
		<tr>
			<td>line</td><td>signals</td><td>delay</td><td>brand</td><td>small-large</td><td>readonly</td></tr>
		<tr>
			<td>time</td><td>interactive</td><td>offset</td><td></td><td></td><td>invalid</td>
		</tr>
		<tr>
			<td>typography</td><td>anchor</td><td>weight</td><td></td><td></td><td>&lt;boolean&gt;</td>
		</tr>
		<tr>
			<td>shadow</td><td>tag</td><td>order</td><td></td><td></td><td>pending</td>
		</tr>
		<tr>
			<td rowspan="80"></td><td></td><td>position</td><td></td><td></td><td>onhold</td>
		</tr>
		<tr>
			<td></td><td>gap</td><td></td><td></td><td>ready</td>
		</tr>
		<tr>
			<td></td><td>block</td><td></td><td></td><td>loaded</td>
		</tr>
		<tr>
			<td></td><td>inline</td><td></td><td></td><td>complete</td>
		</tr>
		<tr>
			<td></td><td>grid</td><td></td><td></td><td>aborted</td>
		</tr>
		<tr>
			<td></td><td>path</td><td></td><td></td><td>error</td>
		</tr>
		<tr>
			<td></td><td></td><td></td><td></td><td></td>
		</tr>

</table>

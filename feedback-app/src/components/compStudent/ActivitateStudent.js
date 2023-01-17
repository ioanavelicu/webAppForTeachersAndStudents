import '../compActivitate/Activitate.css'

function Activitate(props) {
    const { item } = props

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{item.codActivitate}</td>
                        <td>{item.descriere}</td>
                        <td>{item.start}</td>
                        <td>{item.stop}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Activitate